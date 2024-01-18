import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box
} from '@chakra-ui/react'
import { useState } from "react";

const ModalInform = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [codigo, setCodigo] = useState(dataEdit.codigo || "")
    const [nome, setNome] = useState(dataEdit.nome || "")
    const [desc, setDes] = useState(dataEdit.desc || "")
    const [preco, setPreco] = useState(dataEdit.preco || "")

    const handleSave = () => {
        if (!codigo || !nome || !desc || !preco) return

        if (productreadyAlxists()) {
            return alert("Codigo ou Produto ja Cadastrado !")
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { codigo, nome, desc, preco }
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { codigo, nome, desc, preco }]
            : [...(data ? data : [])]

        //Salvando os dados no Banco local 
        localStorage.setItem("Produtos", JSON.stringify(newDataArray))

        setData(newDataArray)
        onClose()
    }

    const productreadyAlxists = () => {
        if (dataEdit.codigo !== codigo && data?.length) {
            return data.find((item) => item.codigo === codigo)
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastrar Produtos</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>

                            <Box>
                                <FormLabel>Codigo</FormLabel>
                                <Input
                                    type="text"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <FormLabel>Desc</FormLabel>
                                <Input
                                    type="text"
                                    value={desc}
                                    onChange={(e) => setDes(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <FormLabel>Preco</FormLabel>
                                <Input
                                    type="number"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                />
                            </Box>

                        </FormControl>
                    </ModalBody>
                    <ModalFooter justifyContent="start">
                        <Button collorSchema="green" mr={3} onClick={handleSave}>
                            Salvar
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            Cancelar
                        </Button>

                    </ModalFooter>

                </ModalContent>
            </Modal>

        </>
    )
}

export default ModalInform