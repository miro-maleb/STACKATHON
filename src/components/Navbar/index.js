import Link from "next/link";
import { Button } from "@mui/material";
export default function Navbar(props) {
  return (
    <>
      <div>
        <Link href="/home">
          <Button>-Home-</Button>
        </Link>
        <Link href="/ingredients">
          <Button>-Ingredients-</Button>
        </Link>
        <Link href="/recipes">
          <Button>-Saved Recipes-</Button>
        </Link>
      </div>
    </>
  );
}
