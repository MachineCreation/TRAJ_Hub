// ------------------------this file contains fetches for the landing page 

import { backend_url } from "./variables";


//----------------------- fetch home returns an object with 5 fields sq-p-name, sq-s-name, clip1, clip2 and, clip3
export const fetchHome = async () => {
        try {
            const response = await fetch(`${backend_url}/populate-home`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch member profile');
            }

            const data = await response.json()

            if (data.length === 0)
                return null

            const home = data[0]

            return home
        }
        catch (error) {
            console.error('An error occurred:', error);
            return null;
        }
    }