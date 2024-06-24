import { useState } from "react";
import useField from "../../../shared/hooks/field";
import { searchCard } from "../../../shared/services/cards";

export const useSearchCard = (props) => {
  const [searchTerm, setSearchTerm] = useState();
  const [searchResult, setSearchResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const { generateCard } = useField();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchButton();
    }
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButton = () => {
    setNotFound(false);
    setSearchResult(undefined);
    setIsLoading(true);
    searchCard(searchTerm)
      .then((result) => {
        setSearchResult(result.data);
      })
      .catch(() => {
        setNotFound(true);
        setSearchResult(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClickCard = (id) => {
    generateCard(props.position, id);
    props.handleCloseSearchModal();
  };

  return {
    handleClickCard,
    handleSearchButton,
    handleSearchInput,
    handleKeyDown,
    searchTerm,
    searchResult,
    isLoading,
    notFound,
  };
};
