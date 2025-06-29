type SidebarProps = {
  isOpen: boolean;
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        width: "200px",
        height: "80vh",
        backgroundColor: "#333",
        color: "#fff",
        position: "fixed",
        margin:"3.5em 0em",
        borderRadius: "1em",
        top: 0,
        left: isOpen ? "0.5em" : "-250px",
        zIndex: 1,
        transition: "left 1s ease",
        padding: "1em",
      }}
    >
      <div className="heading">Previous Chats</div>
      <hr />
      {/* now load using the for loop , all fetched previous workspace */}
      <ul>
        <li>Chat 1</li>
        <li>Chat 2</li>
        <li>Chat 3</li>
        <li>Chat 4</li>
        <li>Chat 5</li>
        <li>Chat 6</li>
        <li>Chat 7</li>
        <li>Chat 8</li>
      </ul>
    </div>
  );
};

export default Sidebar;
