

export const formatDate = ( releaseDate ) => {
    const newFormatDate = new Date(releaseDate).toLocaleDateString('es', { day:"numeric", year:"numeric", month:"long"});

    return newFormatDate;
}