import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { searchCard } from "../../../shared/services/cards";
import useField from "../../../shared/hooks/field";

const SearchCardModal = (props) => {
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

  return (
    <Modal
      open={props.openSearchModal}
      onClose={props.handleCloseSearchModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "24px",
          }}
        >
          <TextField
            placeholder="Type the card name here"
            size="small"
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={handleSearchButton}
            disabled={isLoading}
            variant="contained"
          >
            Search
          </Button>
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap="12px">
          {searchResult &&
            searchResult.map((card) => (
              <Box
                onClick={() => handleClickCard(card.id)}
                sx={{
                  maxWidth: "4vw",
                  flex: "1 0 18%",
                  cursor: "pointer",
                  ":hover": {
                    boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.3)",
                    opacity: "0.8",
                    transition: "0.2s",
                  },
                }}
                component="img"
                src={card.card_images[0].image_url_small}
              />
            ))}
        </Box>
        <Box>
          {notFound && <Typography>Nenhum resultado encontrado.</Typography>}
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchCardModal;
