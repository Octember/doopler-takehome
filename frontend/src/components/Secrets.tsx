import React from "react";
import Secret from "./Secret";
import AddSecret from "./AddSecret";
import { ExperimentName, useExperiments } from "../lib/experiments";

export default function Secrets() {
  const moveButtonExperiment = useExperiments().experiment(
    ExperimentName.MoveAddSecretsButton
  );

  return (
    <>
      {moveButtonExperiment.variationIsActive("variation2") && <AddSecret />}

      <div className="secrets-list">
        {[...Array(25)].map((n) => (
          <Secret />
        ))}
      </div>
      {moveButtonExperiment.variationIsActive(
        "original"
      ) && <AddSecret />}
    </>
  );
}
