import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";




function CreateCabinForm() {

  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const {errors } = formState;
  

  const queryClient = useQueryClient();

  const {mutate, isLoading : isCreating} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
      reset();
    },

    onError:(err) => toast.error(err.message),
  })


  function onSubmit(data) { // this data will be the information you input on the form
    
    mutate({...data,image: data.image[0] }) //renaming the image to the name at data.image[0]
   // console.log(data)
  }

  function onError(errors){
    //console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}> {/**handleSubmit() is from react hook form  and onError too*/}

      <FormRow label="cabin name" error={errors?.name?.message}>
      <Input type="text" id="name" disabled={isCreating} {...register("name", {
          required:"This field is required",
         
        })}/>
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message} >
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register("maxCapacity", {
          required:"This field is required",
          min:{
            value:1,
            message: "capacity should be atleast 1"
          },
        })}/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message} >
        <Input type="number" id="regularPrice" disabled={isCreating} {...register("regularPrice", {
          required:"This field is required",
          min:{
            value:1,
            message: "Price should be atleast 1"
          },
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} disabled={isCreating} {...register("discount", {
          required:"This field is required",
          validate: (value) => value >= getValues().regularPrice || "Discount should be less than regular price",
        })}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message} >
        <Textarea type="number" id="description" disabled={isCreating} defaultValue="" {...register("description", {
          required:"This field is required"
        })} />
      </FormRow>

      <FormRow label="cabin photo">
        
        <FileInput id="image" disabled={isCreating} accept="image/*"  
          {...register("image", {
            required:"This field is required"
          })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled = {isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
