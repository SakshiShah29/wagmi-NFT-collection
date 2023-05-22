const { useState, useEffect } = require("react");

export function useIsMounted(){
const [mounted,setIsMounted]=useState(false)

useEffect(()=>{
 setIsMounted(true)
},[])

return mounted;
}
