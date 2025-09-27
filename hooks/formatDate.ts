/**
 * Utility function to format dates with relative time for recent posts
 * and full date for older posts
 * 
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 1) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        if (diffInMinutes < 1) {
            return 'Baru saja';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} menit yang lalu`;
        } else {
            return `${diffInHours} jam yang lalu`;
        }
    } else {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};
