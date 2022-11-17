import { useState } from "react";
import { Link } from "react-router-dom";

export default function Modal({title, text, option, option_link}) {
    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <div>
            <button
                className="px-6 py-3 text-gray-100 bg-green-700 rounded-md"
                type="button"
                onClick={() => setShowModal(true)}
            >
                {title}
            </button>
        </div>
        {showModal ? (
            <>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                    ></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                            <div>
                                <div className="mt-2 text-center sm:ml-4 sm:text-right">
                                    <p className="my-6 min-w-2xl text-lg leading-relaxed text-gray-600">
                                        {text}
                                    </p>
                                    <div className="flex flex-row items-center gap-2 mt-3">
                                        <button
                                            className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                            onClick={() =>
                                                setShowModal(false)
                                            }
                                        >
                                            اغلاق
                                        </button>
                                        <button
                                            className="w-full mt-2 p-2.5 flex-1 text-gray-100 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 bg-green-700"
                                            onClick={() =>
                                                setShowModal(false)
                                            }
                                        >
                                            <Link to={`/${option_link}`}>{option}</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : null}
      </>
  );
}