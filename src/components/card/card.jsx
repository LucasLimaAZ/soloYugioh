import React from "react";
import { Box, Typography, Grow } from "@mui/material";
import backCard from "../../assets/img/yugioh-back.jpg";
import useField from "../../shared/hooks/field";
import AttackModal from "../modals/attackCard";
import ChangeStatsModal from "../modals/changeStats";
import SearchCardModal from "../modals/searchCard";
import CardContextMenu from "./components/context-menu";
import { useCard } from "./use-card";

const Card = ({ card, type, position }) => {
  const { rotateBoard } = useField();
  const {
    openContextMenu,
    handleClick,
    openAttackModal,
    handleDestroy,
    handleStatsClick,
    handleUpdateStats,
    openChangeStatsModal,
    openSearchModal,
    target,
    setOpenAttackModal,
    setOpenSearchModal,
    setOpenChangeStatsModal,
    handleAttack,
    handleChangePosition,
    handleDirectAttack,
    handleEquip,
    handleFlip,
    handleMonsterAttack,
    handleSearchCard,
    handleTribute,
    anchorEl,
    handleClose,
  } = useCard(position);

  return (
    <Box
      sx={{
        width: "100%",
        paddingBottom: !card && "146%",
        backgroundColor: !card && "rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        ":hover": {
          opacity: "0.8",
        },
      }}
    >
      <Box
        id="card-context"
        aria-controls={openContextMenu ? "card-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openContextMenu ? "true" : undefined}
        sx={{ transform: rotateBoard && "rotate(180deg)" }}
      >
        <CardContextMenu
          {...{
            type,
            handleAttack,
            handleChangePosition,
            handleDirectAttack,
            handleEquip,
            handleFlip,
            handleMonsterAttack,
            handleSearchCard,
            handleTribute,
            handleDestroy,
            anchorEl,
            openContextMenu,
            handleClose,
          }}
        />
        {card && (
          <Box sx={{ transform: card.def_mode && "rotate(90deg)" }}>
            <Grow in>
              <Box
                component="img"
                onClick={handleClick}
                src={
                  card.face_down
                    ? backCard
                    : card.card_images[0].image_url_small
                }
                alt="magic card"
                sx={{ width: "100%" }}
              />
            </Grow>
          </Box>
        )}
        <AttackModal
          card={card}
          openAttack={openAttackModal}
          handleCloseAttack={() => setOpenAttackModal(false)}
          handleDestroyCard={handleDestroy}
          target={target}
        />
        <ChangeStatsModal
          card={card}
          handleCloseStatsModal={() => setOpenChangeStatsModal(false)}
          openStatsModal={openChangeStatsModal}
          updateStats={handleUpdateStats}
        />
        <SearchCardModal
          position={position}
          handleCloseSearchModal={() => setOpenSearchModal(false)}
          openSearchModal={openSearchModal}
        />
      </Box>
      {card?.level && !card?.face_down && (
        <Typography
          onClick={handleStatsClick}
          textAlign="center"
          color="#0f0f0f"
        >
          {card.atk} / {card.def}
        </Typography>
      )}
    </Box>
  );
};

export default Card;
