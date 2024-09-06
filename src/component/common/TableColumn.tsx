interface TableColumnProps {
    text: string;
  }
  
  const TableColumn: React.FC<TableColumnProps> = ({ text }) => {
    return (
      <th className="py-3 px-4 text-left text-white font-semibold">
        {text}
      </th>
    );
  };
  
  export default TableColumn;

  
  