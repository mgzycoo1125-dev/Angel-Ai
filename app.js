document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const messages = document.getElementById('messages');

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage('User', text);
        input.value = '';

        try {
            const response = await fakeAiResponse(text);
            addMessage('Angel AI', response);
        } catch (error) {
            console.error('Error processing message:', error);
            addMessage('System', 'Sorry, an error occurred while processing your request.');
        }
    }

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${escapeHtml(text)}`;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function fakeAiResponse(query) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Received: "${query}". Angel AI is fully operational and updated.`);
            }, 500);
        });
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});