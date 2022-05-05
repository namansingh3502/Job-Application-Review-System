import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/all";
import { useQuery } from "react-query";
import FetchData from "../api/fetchData";
import PersonalDetail from "./personalDetail";
import EducationDetails from "./educationDetails";
import SkillDetails from "./skillDetail";
import axios from "axios";

const Profile = (props) => {
  const { status, data, error, isFetching, isPreviousData } = useQuery(
    [`candidate-${props.id}-profile`, `${props.id}/application`],
    FetchData,
    { keepPreviousData: true, retry: 1, cacheTime: 100000 * 60 * 5 }
  );

  async function ChangeApplicationStatus(param) {
    axios
      .post(
        `${param.user_id}/application/update_status`,
        {
          status: param.status,
        },
        {}
      )
      .then((res) => {
        if (res.status === 200) {
          alert(`Application ${param.status}.`);
          props.setIsOpen();
        }
      });
  }

  return (
    <div>
      {status === "success" && (
        <Transition appear show={props.isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={props.setIsOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto w-full">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-gray-900 py-4 mx-2"
                    >
                      <span>Candidate Profile</span>
                      <button
                        className={
                          "float-right hover:bg-red-700 bg-red-500 text-white rounded-full p-1 text-sm"
                        }
                        type={"button"}
                        onClick={props.setIsOpen}
                      >
                        <AiOutlineClose />
                      </button>
                    </Dialog.Title>
                    <div>
                      <PersonalDetail data={data.data.candidate_details} />

                      <SkillDetails data={data.data.skill_details} />

                      <EducationDetails data={data.data.education_details} />

                      {/*<div*/}
                      {/*  className={*/}
                      {/*    "w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"*/}
                      {/*  }*/}
                      {/*>*/}
                      {/*  Resume*/}
                      {/*</div>*/}

                      <div
                        className={
                          "h-12 py-1 space-x-2 text-slate-100 text-lg font-medium"
                        }
                      >
                        <button
                          className={
                            "rounded px-2 py-1 bg-green-500 hover:bg-green-600"
                          }
                          type={"button"}
                          onClick={() =>
                            ChangeApplicationStatus({
                              status: "Accepted",
                              user_id: props.id,
                            })
                          }
                        >
                          Accept
                        </button>
                        <button
                          className={
                            "rounded px-2 py-1 bg-red-500 hover:bg-red-700"
                          }
                          type={"button"}
                          onClick={() => {
                            const res = ChangeApplicationStatus({
                              status: "Rejected",
                              user_id: props.id,
                            });
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default Profile;
