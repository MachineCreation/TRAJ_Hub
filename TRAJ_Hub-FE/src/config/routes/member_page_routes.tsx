

//types
import { Signed_url } from "../types";

// Variables
import { backend_url } from "../variables";

export const updateMemberClips = async (
  uname: string,
  clip_data: { [key: string]: string | File | null }
) => {
  if (!uname) {
    console.error({ error: "No username found" });
    return { ok: false };
  }
  if (!clip_data) {
    console.error({ error: "No clip files found" });
    return { ok: false };
  }

  try {
    const formData = new FormData();
    Object.entries(clip_data).forEach(([key, value]: [string, string | File | null]) => {
      if (value instanceof File) {
        const extension = value.type.split("/")[1];
        formData.append(key, `${uname}_${key}.${extension}`);
      }
    });

    const response = await fetch(`${backend_url}/clip-upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.ok) {
      const signedData: Signed_url = await response.json();
      console.log({ "Signed URLs": signedData.urls });

      console.log('starting uploads')
      const uploadPromises = Object.entries(signedData.urls).map(
        async ([key, value]) => {
          if (clip_data[key] instanceof File && value.signed_url) {
            console.log(`${key} upload started`)
            const file = clip_data[key] as File;
            const supabaseForm = new FormData();
            supabaseForm.append(value.path, file)
            const supabase = await fetch(value.signed_url, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type,
                },
                body: file,
              });

            if (supabase) {
                clip_data[key] = `https://obnwntqubaadmcbmdjjp.supabase.co/storage/v1/object/public/member_clips/${value.path}?`;
            }

            console.log(`Uploaded ${key}:`, value.path);
          }
        }
      );

      await Promise.all(uploadPromises);
    } else {
      console.error("Failed to fetch signed URLs:", response.statusText);
      return { ok: false };
    }
  } catch (error) {
    console.error({ error });
    return { ok: false };
  }

  try {
    const updateFormData = new FormData();
    updateFormData.append("uname", uname);
    Object.entries(clip_data).forEach(([key, value]) => {
      if (value) {
        updateFormData.append(key, value);
      }
    });
    

    const updateResponse = await fetch(`${backend_url}/update-clip-field`, {
      method: "POST",
      credentials: "include",
      body: updateFormData,
    });

    if (updateResponse.ok) {
      console.log("Clips updated successfully");
      return { ok: true };
    } else {
      console.error("Failed to update clips:", updateResponse.statusText);
      return { ok: false };
    }
  } catch (error) {
    console.error({ error });
    return { ok: false };
  }
};
