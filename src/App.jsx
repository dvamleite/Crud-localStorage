import { EditIcon, DeleteIcon, Search2Icon } from "@chakra-ui/icons"
import { Box, Flex, Button, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, useBreakpointValue, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ModalInform from "./components/modal/ModalInfor"

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState([])
  const [dataEdit, setDataEdit] = useState({})  

  const isMobile = useBreakpointValue({
    base: true,
    lg: false
  })

  useEffect(() => {
    const db_costumer = localStorage.getItem("Produtos")
      ? JSON.parse(localStorage.getItem("Produtos"))
      : []

    setData(db_costumer)
  }, [setData])

  const handleRemove = (codigo) => {
    const newArray = data.filter((item) => item.codigo !== codigo)

    setData(newArray)

    localStorage.setItem("Produtos", JSON.stringify(newArray))
  }

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
      flexDirection="column"
    >
      <Flex
        w="100%"
        h="10vh"
        display="flex"
        align-items="start"
        justify-content="space-between"
        fontSize="10px"
        fontFamily="poppins"
        background={"#b4d3c2d4"}>

        <Box py={5} px={2}>
          <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]} >Cadastrar Produto</Button>
        </Box>

        <Box display="Flex" py={5} px={2}>
          <Input
            type="text"
            bg="whitesmoke"
          />
          <Button ml={2} colorScheme="green" onClick={() => alert("Em construção !!")} >
            <Search2Icon fontSize={20} mr={2} />
            Buscar </Button>
        </Box>

      </Flex>

      <Box overflow="auto" width="100%" height="100%" >
        <Table >
          <Thead>
            <Tr background={"#6068659f"} >
              <Th maxW={isMobile ? 5 : 100} fontSize={{ base: "8px", md: "10px", lg: "12px" }}>Codigo</Th>
              <Th maxW={isMobile ? 5 : 100} fontSize={{ base: "8px", md: "10px", lg: "12px" }}>Nome</Th>
              <Th maxW={isMobile ? 5 : 100} fontSize={{ base: "8px", md: "10px", lg: "12px" }}>Desc</Th>
              <Th maxW={isMobile ? 5 : 100} fontSize={{ base: "8px", md: "10px", lg: "12px" }}>Preço</Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(({ codigo, nome, desc, preco }, index) => (
              <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                <Td maxW={isMobile ? 5 : 100} fontSize={{ base: "8px", md: "10px", lg: "12px" }}>{codigo}</Td>
                <Td maxW={isMobile ? 5 : 100} fontSize={{ base: "8px", md: "10px", lg: "12px" }}>{nome}</Td>
                <Td maxW={isMobile ? 5 : 100} fontSize={{ base: "8px", md: "10px", lg: "12px" }}>{desc}</Td>
                <Td maxW={isMobile ? 5 : 100} fontSize={{ base: "8px", md: "10px", lg: "12px" }}>{"$ " + preco}</Td>

                <Td p={0}>
                  <EditIcon fontSize={{ base: "16px", md: "18px", lg: "20px"}} onClick={() => [setDataEdit({ codigo, nome, desc, preco, index }), onOpen()]}></EditIcon>
                </Td>

                <Td p={0}>
                  <DeleteIcon fontSize={{ base: "16px", md: "18px", lg: "20px"}} onClick={() => handleRemove(codigo)} />
                </Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {isOpen && (<ModalInform isOpen={isOpen} onClose={onClose} data={data} setData={setData} dataEdit={dataEdit} setDataEdit={setDataEdit} />)}
    </Flex>
  )
}

export default App
