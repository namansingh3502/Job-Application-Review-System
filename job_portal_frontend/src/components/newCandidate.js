import ReactSelect from "react-select";
import { Fragment } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/all";

const options = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Expert", label: "Expert" },
];

const NewCandidate = (props) => {
  const { register, control, handleSubmit } = useForm({});
  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({ control, name: "skill" });
  const {
    fields: educationFields,
    append: educationAppend,
    remove: educationRemove,
  } = useFieldArray({ control, name: "education" });

  const onSubmit = (data) => console.log("data", data);

  return (
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
              <Dialog.Panel
                className={
                  "w-full max-w-4xl h-auto transform rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all overflow-auto"
                }
              >
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

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div
                    className={
                      "w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"
                    }
                  >
                    Personal Details
                  </div>
                  <div className={"p-2 space-y-2 text-md"}>
                    <div
                      className={
                        "w-full flex flex-wrap items-center sm:space-x-4"
                      }
                    >
                      <label className={"pr-2"}>First Name : </label>
                      <input
                        className={
                          "border-2 rounded p-1 focus:outline-blue-500"
                        }
                        placeholder={"Naman"}
                        {...register(`personel.firstName`, {
                          required: true,
                        })}
                      />

                      <label className={"pr-2"}>Last Name : </label>
                      <input
                        className={
                          "border-2 rounded p-1 focus:outline-blue-500"
                        }
                        placeholder={"Singh"}
                        {...register(`personel.lastName`, {
                          required: true,
                        })}
                      />
                    </div>
                    <div
                      className={
                        "w-full flex flex-wrap items-center sm:space-x-4"
                      }
                    >
                      <label className={"pr-2"}>Mobile No. : </label>
                      <input
                        className={
                          "border-2 rounded p-1 focus:outline-blue-500"
                        }
                        placeholder={"+91-9108784260"}
                        {...register(`personel.phone`, {
                          required: true,
                        })}
                      />

                      <label className={"pr-2"}>Email : </label>
                      <input
                        className={
                          "border-2 rounded p-1 focus:outline-blue-500"
                        }
                        placeholder={"example@example.com"}
                        {...register(`personel.email`, {
                          required: true,
                        })}
                      />
                    </div>
                    <div
                      className={"w-auto flex flex-wrap items-center space-x-4"}
                    >
                      <label>Gender : </label>
                      <Controller
                        name="personel.gender"
                        control={control}
                        render={({ field }) => (
                          <ReactSelect
                            isClearable
                            {...field}
                            options={[
                              { value: "Male", label: "Male" },
                              { value: "Female", label: "Female" },
                            ]}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      "w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"
                    }
                  >
                    Skills
                  </div>
                  <div className={"p-2 text-md"}>
                    <ul className={"space-y-2"}>
                      {skillFields.map((item, index) => {
                        return (
                          <li
                            key={item.id}
                            className={"flex flex-wrap space-x-2 items-center"}
                          >
                            <label>Skill : </label>

                            <input
                              className={
                                "border-2 rounded p-1 focus:outline-blue-500"
                              }
                              placeholder={"Skill..."}
                              {...register(`skill.${index}.name`, {
                                required: true,
                              })}
                            />
                            <Controller
                              name={`skill.${index}.skill_level`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <ReactSelect
                                    className={"w-72"}
                                    isClearable
                                    {...field}
                                    options={options}
                                  />
                                );
                              }}
                            />
                            <button
                              className={
                                "bg-red-500 py-1 px-2 rounded hover:bg-red-700 text-slate-200"
                              }
                              type={"button"}
                              onClick={() => skillRemove(index)}
                            >
                              Delete
                            </button>
                          </li>
                        );
                      })}
                      <button
                        className={
                          "bg-blue-500 py-1 px-2 rounded hover:bg-blue-700 text-slate-200"
                        }
                        type={"button"}
                        onClick={() => {
                          skillAppend({ name: "", level: "" });
                        }}
                      >
                        Add
                      </button>
                    </ul>
                  </div>

                  <div
                    className={
                      "w-full py-1 text-gray-600 bg-gray-300 font-medium px-2"
                    }
                  >
                    Education Details
                  </div>
                  <div className={"p-2 text-md"}>
                    <ul className={"space-y-2"}>
                      {educationFields.map((item, index) => {
                        return (
                          <li
                            key={item.id}
                            className={"flex flex-wrap space-y-2 items-center"}
                          >
                            <div className={"w-full"}>
                              <label>College/Institute Name : </label>
                              <input
                                className={
                                  "border-2 rounded p-1 focus:outline-blue-500 w-full lg:w-1/2"
                                }
                                placeholder={"College/Institute..."}
                                {...register(
                                  `skill.${index}.certificate_degree_name`,
                                  {
                                    required: true,
                                  }
                                )}
                              />
                            </div>
                            <div className={"w-full"}>
                              <label>Degree/Certificate : </label>
                              <input
                                className={
                                  "border-2 rounded p-1 focus:outline-blue-500 lg:w-1/3 w-full"
                                }
                                placeholder={"Degree/Certificate..."}
                                {...register(`skill.${index}.major`, {
                                  required: true,
                                })}
                              />
                            </div>
                            <div className={"w-full"}>
                              <label>Major : </label>
                              <input
                                className={
                                  "border-2 rounded p-1 focus:outline-blue-500 lg:w-1/3 w-full"
                                }
                                placeholder={"Major..."}
                                {...register(`skill.${index}.major`, {
                                  required: true,
                                })}
                              />
                            </div>
                            <div>
                              <label>Major : </label>
                              <input
                                className={
                                  "border-2 rounded p-1 focus:outline-blue-500"
                                }
                                placeholder={"Major..."}
                                {...register(`skill.${index}.major`, {
                                  required: true,
                                })}
                              />
                            </div>
                            <button
                              className={
                                "bg-red-500 py-1 px-2 rounded hover:bg-red-700 text-slate-200"
                              }
                              type={"button"}
                              onClick={() => educationRemove(index)}
                            >
                              Delete
                            </button>
                          </li>
                        );
                      })}
                      <button
                        className={
                          "bg-blue-500 py-1 px-2 rounded hover:bg-blue-700 text-slate-200"
                        }
                        type={"button"}
                        onClick={() => {
                          educationAppend({ name: "", level: "" });
                        }}
                      >
                        Add
                      </button>
                    </ul>
                  </div>

                  <button
                    className={
                      "bg-green-500 py-1 px-2 rounded hover:bg-green-700 text-white m-4"
                    }
                    type={"submit"}
                  >
                    Submit
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewCandidate;
