import { useEffect, useState } from "react";
import Signup from "./Signup";
import Terms from "./Terms";
import Modal from "../../component/Modal";
import Term from "./Term";
import CollectTerm from "./CollectTerm";

const SignupPage = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [header, setHeader] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    all: false,
    essential1: false,
    essential2: false,
  });

  const contents = () => {
    if (header.includes("개인정보")) {
      return <CollectTerm />;
    } else return <Term />;
  };

  const onChangeCheck = () => {
    const id = header.includes("개인정보") ? "essential2" : "essential1";

    setCheckedItems((prev) => {
      const updatedItems = {
        ...prev,
        [id]: true,
      };

      const allChecked = updatedItems.essential1 && updatedItems.essential2;
      return {
        ...updatedItems,
        all: allChecked,
      };
    });
    setModalOpen(false);
  };

  useEffect(() => {
    header && contents();
  }, [header]);

  return (
    <>
      {isAgree ? (
        <Signup />
      ) : (
        <Terms
          setIsAgree={setIsAgree}
          setModalOpen={setModalOpen}
          setHeader={setHeader}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      )}
      <Modal
        open={modalOpen}
        close={() => setModalOpen(false)}
        header={header}
        type={true}
        yes={"동의"}
        confirm={onChangeCheck}
      >
        {contents()}
      </Modal>
    </>
  );
};
export default SignupPage;
