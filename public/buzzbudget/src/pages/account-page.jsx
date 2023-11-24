import { useParams } from "react-router-dom";

function BudgetPage() {
  const { userId } = useParams();

  return (
    <>
      <p>compte de {userId}</p>
    </>
  );
}

export default BudgetPage;
