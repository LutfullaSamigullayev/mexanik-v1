import { Link } from "react-router-dom";
import { Icons } from "./icons";

export function Logo() {
    return (
        <Link to={"/"} className="w-fit"><div className="w-fit flex gap-2 items-center text-3xl font-medium text-gray-700"><Icons.logo />Mexanik</div></Link>
    )
    
    
}