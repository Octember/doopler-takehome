import React from "react";
import Member from "./Member";
import AddMember from "./AddMember";
import "../css/Members.css";
import { useExperiments, ExperimentName } from "../lib/experiments";

export default function Members() {
  const experimentation = useExperiments();

  console.log(experimentation.getActiveVariation(ExperimentName.AddMembers));

  return (
    <>
      {experimentation.useVariation(ExperimentName.AddMembers, 'variation') && <AddMember />}
      <table id="members">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
          <Member name="Jane Doe" role="Admin" email="jane@example.com" />
          <Member name="Jon Smith" role="Member" email="jon@example.com" />
        </tbody>
      </table>
      {experimentation.useVariation(ExperimentName.AddMembers, 'original') && <AddMember />}
    </>
  );
}
