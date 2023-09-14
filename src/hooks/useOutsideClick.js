import { useRef , useEffect} from "react";


export function useOutsideClick(handler,listenCapturing = true){
    const ref = useRef();

  useEffect(function(){
    function handleClicked(e){
      if(ref.current && !ref.current.contains(e.target)){
        handler();
      }
    }

    document.addEventListener("click",handleClicked,listenCapturing); //adding the third parameter so the event does not bubble back up,and close the modal immediately. the event will stop at the capturing phase,it will not bubble back up

    return () => document.removeEventListener("click",handleClicked,listenCapturing)
  },[handler,listenCapturing])

  return ref;

}