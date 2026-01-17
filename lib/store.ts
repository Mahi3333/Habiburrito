export async function getStoreStatus() {
    // Default open
    return {
        isOpen: true,
        reason: 'OPEN',
        message: '',
        nextOpenTime: ''
    };
}
