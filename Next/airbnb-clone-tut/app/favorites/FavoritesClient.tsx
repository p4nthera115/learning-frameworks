"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import Heading from "../components/Heading";
import { Container } from "../components/Container";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps {
  favorites: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favorites,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/favorites/${id}`)
        .then(() => {
          toast.success("Unfavorited");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
