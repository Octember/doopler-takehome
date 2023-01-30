import React from "react";
import Secret from "./Secret";
import AddSecret from "./AddSecret";
import { getContext, Context } from "../lib/context";
import { ExperimentName, useExperiments } from "../lib/experiments";

export default function Secrets() {
  const ctx: Context = getContext();
  const experimentation = useExperiments();

  return (
    <>
      {experimentation.useVariation(
        ExperimentName.MoveAddSecretsButton,
        "variation2"
      ) && <AddSecret />}

      <div className="secrets-list">
        {[...Array(25)].map((n) => (
          <Secret />
        ))}
      </div>
      {experimentation.useVariation(
        ExperimentName.MoveAddSecretsButton,
        "original"
      ) && <AddSecret />}
    </>
  );
}
