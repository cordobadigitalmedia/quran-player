import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import TopBar from "../src/components/TopBar";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/router";

const people = [
  { id: 1, name: "Page 1" },
  { id: 2, name: "Page 2" },
  { id: 3, name: "Page 3" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const quranImage =
  "https://res.cloudinary.com/duisewapt/image/upload/v1662666252/quran/pages/";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [selectedPerson, setSelectedPerson] = useState();

  const gotoPage = (val) => {
    setSelectedPerson(val);
    router.push(`/${val.id}`);
  };

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Head>
        <title>Quran Recitation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      <div className="w-full flex items-center justify-center">
        <div className="h-screen flex pt-4 justify-center mt-12 bg-[url('/0.png')] bg-auto bg-no-repeat bg-center w-[450px]">
          <Combobox as="div" value={selectedPerson} onChange={gotoPage}>
            <Combobox.Label className="block text-sm font-medium text-gray-700">
              Select a Page
            </Combobox.Label>
            <div className="relative mt-1">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(person) => person?.name}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {filteredPeople.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      value={person}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-indigo-600 text-white" : "text-gray-900"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              "block truncate",
                              selected && "font-semibold"
                            )}
                          >
                            {person.name}
                          </span>

                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-indigo-600"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
      </div>
    </>
  );
}
