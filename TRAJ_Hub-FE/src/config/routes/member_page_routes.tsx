// Variables
import { backend_url } from "../variables";

export const updateMemberClips = async (uname: string, clip_data: {[key:string]:string | File | null}) => {
    if (!uname) {
        console.error({'error': 'No username found'})
        return {ok: false}
    }
    if (!clip_data){
        console.error({'error': 'No clip files found'})
        return {ok: false}
    }

    try {
        const formData = new FormData();
        formData.append('uname', uname)
        Object.entries(clip_data).map(([key, value]:[string, string | File |null]) => {
            if (value)
                formData.append(key,value)
        })
        console.log(formData)
        const response = await fetch(`${backend_url}/clip-upload`, {
            method: "POST",
            credentials: "include",
            body: formData
        })

        if (!response.ok){
            console.error({'error': response.statusText})
            return {ok:false}
        }
        return response
    }
    catch(error) {
        console.error({'error': error})
        return {ok: false}
    }
}