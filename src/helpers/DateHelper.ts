export const GetDuration = (start_date: string | undefined, end_date: string | undefined) => {
    if (start_date && end_date) {
        const inicio = new Date(start_date);
        const fin = new Date(end_date);

        let anos = fin.getFullYear() - inicio.getFullYear();
        let meses = fin.getMonth() - inicio.getMonth();
        let dias = fin.getDate() - inicio.getDate();

        if (dias < 0) {
            meses--;
            const ultimoDiaMesAnterior = new Date(fin.getFullYear(), fin.getMonth(), 0).getDate();
            dias += ultimoDiaMesAnterior;
        }

        if (meses < 0) {
            anos--;
            meses += 12;
        }
        return `Años: ${anos}, Meses: ${meses}, Días: ${dias}`
    }
}

export const validateDates = (start_date: string | undefined, end_date: string | undefined): boolean => {
    if (start_date && end_date) {

        const start = new Date(start_date);
        const end = new Date(end_date);

        if (end < start) {
            return false;
        }
    }
    return true;
}