import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createEditCabin } from "../../services/apiCabins";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";




function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  const {id:editId, ...editValues} = cabinToEdit;
  const isEditedSession = Boolean(editId); // if theres no id it will return false

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditedSession ? editValues : {} //if you dont want default values on the form then dont write this line of code
  });
 
  const {errors } = formState;


  const{isCreating,createCabin} = useCreateCabin();
  const {isEditing,editCabin} = useEditCabin();

  const isWorking = isCreating || isEditing;



  
  function onSubmit(data) { // this data will be the information you input on the form

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if(isEditedSession)
      editCabin({newCabinData : {...data,image}, id:editId}, {
        onSuccess: (data) => {
          //console.log(data)
          reset(); //reset form on success
          onCloseModal?.();
        }
      });

      else createCabin({...data,image:image}, {
        onSuccess: (data) => {
          //console.log(data)
          reset();
        }
      })
    
   // mutate({...data,image: data.image[0] }) //renaming the image to the name at data.image[0]
    //console.log(data)
  }

  function onError(errors){
    //console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type = { onCloseModal ? "modal" : "regular"}> {/**handleSubmit() is from react hook form  and onError too*/}

      <FormRow label="cabin name" error={errors?.name?.message}>
      <Input type="text" id="name" disabled={isWorking} {...register("name", {
          required:"This field is required",
         
        })}/>
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message} >
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", {
          required:"This field is required",
          min:{
            value:1,
            message: "capacity should be atleast 1"
          },
        })}/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message} >
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
          required:"This field is required",
          min:{
            value:1,
            message: "Price should be atleast 1"
          },
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register("discount", {
          required:"This field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price",
        })}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message} >
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register("description", {
          required:"This field is required"
        })} />
      </FormRow>

      <FormRow label="cabin photo">
        
        <FileInput id="image" disabled={isWorking} accept="image/*"  
          {...register("image", {
            required: isEditedSession ? false : "This field is required"
          })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}> {/**if oncloseModal is undefined it will not get called */}
          Cancel
        </Button>
        <Button disabled = {isWorking}>{isEditedSession ? "Edit cabin" : "create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
