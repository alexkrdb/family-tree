import Node from "../../components/tree/Node" 
function Tree() {

  const persons = [
    {
      id: "root",
      firstName: "John",
      lastName: "Black"
    },
    {
      id: "parent_1",
      firstName: "John",
      lastName: "Black"
    },
    {
      id: "parent_2",
      firstName: "John",
      lastName: "Black"
  }];
  
  const childParentRel = {
    children: ["root"],
    parents: ["parent_1", "parent_2"]
  };

  let x = 0;
  const getX = () => {
    x += 100;
    return {left: x + "px"}
  } 
  return (
    <div className="treePage">
      <div className="pageContent">
        {persons.map((person)=>(
          <Node person={person} style={getX()}/>
        ))}
      </div>
    </div>
  );
}

export default Tree;
