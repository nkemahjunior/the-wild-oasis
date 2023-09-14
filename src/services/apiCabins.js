import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(){//reading data from the table on supabase, note that you must turn on the policy for update
    
const  { data, error } = await supabase
.from('cabins')
.select('*')

if(error){
    console.error(error)
    throw new Error("cabins could not be loaded")
}

return data;

}

export async function createEditCabin(newCabin, id){//insertinig data to the table on supabase, note that you must turn on the policy for update

    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/",""); //math.random to create unique image paths

    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    // https://ezkecyzhdopnxuhdhqrp.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg : how the image path on supabase should look

    //1) create the cabin
    let query = supabase.from('cabins')

    //A) create
    if(!id) {
       query = query.insert([ {...newCabin, image:imagePath}])
    }


    //B) EDIT
    if(id) {
       query =  query.update({ ...newCabin, image:imagePath })
        .eq('id', id) // where column id = the id we will pass in
        .select()
    }

    const {data,error} = await query.select()
    .single() //creare the new row immediately;
  
    

    //2) updload image

    if(hasImagePath) return data;

    const {  error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName,newCabin.image) 
  //3)delete the cabin if there was an error uploading the corresponding image
  if(storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)
    
    console.log(storageError)
    throw new Error("cabin image could not be uploaded nd the cabin was not created")
  }

  return data;


}


export async function deleteCabin(id){//deleting data from the table on supabase, note that you must turn on the policy for delete
    const{data, error} =  await supabase
      .from('cabins')
      .delete()
      .eq('id', id)


      if(error){
        console.error(error)
        throw new Error("cabins could not be deleted")
    }

    return data;
    
}