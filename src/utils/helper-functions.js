export const sanitizeString = string => {
    if(string){
        return string?.toString().replace(/(<([^>]+)>)/gi, '')
    }
}