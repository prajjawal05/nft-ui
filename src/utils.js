function timeAgo(timestamp) {
    const now = new Date();
    const seconds = Math.max(1, Math.floor((now - timestamp * 1000) / 1000));

    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        let interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            if (unit === 'second') {
                interval = 'Few';
            }
            return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
        }
    }

    // If none of the intervals match, show the absolute date
    return new Date(timestamp).toLocaleDateString();
}

function getColorForCharacter(character) {
    // Implement your logic to determine color based on the character
    // This is just a simple example, replace it with your own logic
    const charCode = character.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
    const hue = (charCode % 26) * (360 / 26); // Use character code to determine hue
    return `hsl(${hue}, 70%, 50%)`;
}

export { timeAgo, getColorForCharacter };