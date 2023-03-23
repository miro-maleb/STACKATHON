import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Link from "next/link";

export default function Home(props) {
  const [newCategory, setNewCategory] = useState("");
  const { categories } = props;

  const handleClick = async () => {
    await axios.post("/api/categories", {
      category: newCategory,
    });
  };

  const handleDelete = async (categoryId) => {
    await axios.delete(`/api/categories/${categoryId}`, {
      categoryId,
    });
  };

  if (categories.length > 0) {
    return (
      <div>
        <Navbar />
        <div>What are you hungry for?</div>
        <div>
          {categories.map((category) => (
            <div>
              <Link
                key={category.id}
                value={category.name}
                href={{
                  pathname: `/new-recipe/${category.name}`,
                }}
              >
                {category.name}
              </Link>
              <button
                onClick={() => {
                  handleDelete(category.id);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleClick}>make new category</button>
      </div>
    );
  } else return null;
}
export async function getServerSideProps() {
  const response = await axios.get("http://127.0.0.1:3000/api/categories");
  const { data } = response;
  return {
    props: {
      categories: data,
    },
  };
}
