"use client";
import { AuthContext } from "@/contexts/auth";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext, useState } from "react";
import { Button } from "./button";

export const Header = () => {
  const { user, signOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ height: "3.5rem", width: "100%" }}
      layoutRoot
      animate={{
        height: open ? "100vh" : "3.5rem",
        width: "100%",
      }}
      transition={{
        duration: 0.3,
        type: "tween",
      }}
      className="flex h-[3.5rem] overflow-hidden px-4 flex-col bg-dark fixed w-full z-10 top-0 md:hidden"
    >
      <div className="py-3 w-full flex justify-between">
        <Link href="/app">
          <div className="w-20 h-8 bg-cover bg-no-repeat  bg-[url(/assets/logo-wo-name.png)] bg-center " />
        </Link>

        <motion.button
          layout
          layoutRoot
          className="mr-2"
          onClick={(e) => {
            e.preventDefault();

            setOpen(!open);
          }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {!open && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HamburgerMenuIcon className="w-5 h-5" />
              </motion.div>
            )}
            {open && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Cross1Icon className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="flex flex-col w-full mt-10 space-y-5 h-full overflow-y-auto overflow-x-hidden">
        {user?.role === "USER" && (
          <>
            <Link passHref href="/app/workouts">
              <Button
                onClick={(e) => setOpen(!open)}
                className="w-full !bg-gray1 text-white hover:bg-opacity-80 "
              >
                Meus treinos
              </Button>
            </Link>
          </>
        )}

        {user?.role === "INSTRUCTOR" && (
          <>
            <Link passHref href="/app/exercises">
              <Button
                onClick={(e) => setOpen(!open)}
                className="w-full !bg-gray1 text-white hover:bg-opacity-80 "
              >
                Exercicios
              </Button>
            </Link>
            <Link passHref href="/app/exercises/new">
              <Button
                onClick={(e) => setOpen(!open)}
                className="w-full !bg-gray1 text-white hover:bg-opacity-80 "
              >
                Cadastrar exercicios
              </Button>
            </Link>
            <Link passHref href="/app/exercises/listing">
              <Button
                onClick={(e) => setOpen(!open)}
                className="w-full !bg-gray1 text-white hover:bg-opacity-80 "
              >
                Listagem de exercicios
              </Button>
            </Link>
            <Link passHref href="/app/workouts/new">
              <Button
                onClick={(e) => setOpen(!open)}
                className="w-full !bg-gray1 text-white hover:bg-opacity-80 "
              >
                Cadastro de treino
              </Button>
            </Link>
            <Link passHref href="/app/exercises/list-training-all">
              <Button
                onClick={(e) => setOpen(!open)}
                className="w-full !bg-gray1 text-white hover:bg-opacity-80 "
              >
                Listar todos os treinos
              </Button>
            </Link>
          </>
        )}
      </div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col space-y-4 mb-5"
      >
        {user?.role === "USER" && (
          <div className="flex flex-col">
            <p className=" text-primary font-medium w-full text-center">
              {user?.hash}
            </p>
            <p className=" text-xs opacity-50 font-medium w-4/5 mx-auto text-center">
              Ao solicitar um treino, voce deve informar este número ao
              instrutor.
            </p>
          </div>
        )}
        <Link passHref href="/app/profile">
          <Button
            onClick={(e) => setOpen(!open)}
            className="w-full !bg-gray1 text-white hover:bg-opacity-80 "
          >
            Editar perfil
          </Button>
        </Link>
        <Button
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
          className="w-full "
          intent="primary"
        >
          Sair
        </Button>
      </motion.div>
    </motion.header>
  );
};