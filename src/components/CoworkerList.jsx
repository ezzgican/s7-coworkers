import Coworker from "./Coworker";

export default function CoworkerList({ members }) {
  return (
     <ul>
      {members.map((person, i) => (
        <li key={i}>
          <Coworker person={person} />
        </li>
      ))}
    </ul>
  );
}
