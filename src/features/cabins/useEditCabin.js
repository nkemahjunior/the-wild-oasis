import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin(){
    const queryClient = useQueryClient();

    const {mutate : editCabin, isLoading : isEditing} = useMutation({
        mutationFn: ({newCabinData,id}) => createEditCabin(newCabinData,id), //created this arrow function because we can pass juist one arguement here,so we create an object an pass it as an arguement, note that the object acts as a single arguement,then we destruct it immediately part 356 18:15
        onSuccess: () => {
          toast.success(" cabin successfully edited");
          queryClient.invalidateQueries({
            queryKey: ["cabins"]
          });
          //reset();
        },
    
        onError:(err) => toast.error(err.message),
      })
    
      return {isEditing,editCabin}
}