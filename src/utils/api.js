/**
 * Generates an image using Hugging Face SDXL 1.0 via local Vite proxy.
 * 
 * @param {string} prompt - The full rich prompt for generation
 * @returns {Promise<string>} - Returns the Object URL of the generated image blob
 */
export const generateImageHF = async (prompt) => {
    // Hybrid Key Logic: env variable first, then localStorage
    const token = import.meta.env.VITE_HF_TOKEN || localStorage.getItem('hf_token');

    if (!token) {
        throw new Error("Токен не указан. Пожалуйста, добавьте Hugging Face Token в настройках.");
    }

    try {
        const response = await fetch('/hf-api/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.trim()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: prompt })
        });

        // 503 means the model is warming up (cold start)
        if (response.status === 503) {
            throw new Error("WARMING_UP");
        }

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Ошибка HF (${response.status}): ${errText}`);
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (err) {
        console.error("HF Generation Error:", err);
        throw err;
    }
};

/**
 * Generates an image via AI Horde (free community GPU cluster) with async polling.
 * 
 * @param {string} prompt - The full rich prompt for generation
 * @param {function} onProgress - Optional callback(string) for status updates
 * @returns {Promise<string>} - Returns the final image URL when complete
 */
export const generateImageHorde = async (prompt, onProgress) => {
    const apiKey = import.meta.env.VITE_HORDE_API_KEY
        || localStorage.getItem('horde_key')
        || '0000000000'; // Anonymous key (slower but free)

    const HORDE_API = '/horde-api';

    try {
        // Step 1: Submit generation job
        onProgress?.('Отправка задачи...');
        const submitRes = await fetch(`${HORDE_API}/v2/generate/async`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey,
                'Client-Agent': 'MURA_AI:1.0:Contact_At_Zhetysu_University'
            },
            body: JSON.stringify({
                prompt: prompt,
                params: {
                    sampler_name: 'k_euler_a',
                    cfg_scale: 7.5,
                    steps: 30,
                    width: 768,
                    height: 768,
                    n: 1
                },
                models: ['AlbedoBase XL'],
                r2: true // Use R2 CDN for image delivery
            })
        });

        if (!submitRes.ok) {
            const errData = await submitRes.json().catch(() => ({}));
            throw new Error(`Horde Submit Error (${submitRes.status}): ${errData.message || submitRes.statusText}`);
        }

        const { id: jobId } = await submitRes.json();
        if (!jobId) throw new Error("AI Horde не вернул ID задачи.");

        // Step 2: Poll for status every 3 seconds
        while (true) {
            await new Promise(r => setTimeout(r, 3000));

            const statusRes = await fetch(`${HORDE_API}/v2/generate/check/${jobId}`, {
                headers: { 'apikey': apiKey, 'Client-Agent': 'MURA-AI:1.0' }
            });
            const statusData = await statusRes.json();

            if (statusData.faulted) {
                throw new Error("AI Horde: задача прервана из-за ошибки.");
            }

            const queuePos = statusData.queue_position ?? '?';
            const waitTime = statusData.wait_time ?? '?';
            onProgress?.(`Очередь: #${queuePos} · ~${waitTime}с`);

            if (statusData.done) {
                // Step 3: Fetch the result
                onProgress?.('Загрузка изображения...');
                const resultRes = await fetch(`${HORDE_API}/v2/generate/status/${jobId}`, {
                    headers: { 'apikey': apiKey, 'Client-Agent': 'MURA-AI:1.0' }
                });
                const resultData = await resultRes.json();

                const generation = resultData.generations?.[0];
                if (!generation) throw new Error("AI Horde: нет изображений в ответе.");

                // Horde returns a URL (R2 CDN) or base64
                if (generation.img?.startsWith('http')) {
                    return generation.img;
                } else {
                    // base64 → blob URL
                    const byteChars = atob(generation.img);
                    const byteNums = Array.from(byteChars, c => c.charCodeAt(0));
                    const blob = new Blob([new Uint8Array(byteNums)], { type: 'image/webp' });
                    return URL.createObjectURL(blob);
                }
            }
        }
    } catch (err) {
        console.error("Horde Generation Error:", err);
        throw err;
    }
};

