def mostrar_intro():
    print("\nBem-vindo à Aventura em Texto!")
    print("Você está em uma floresta escura. Uma trilha se estende ao norte e outra ao leste.")
    print("Seu objetivo é encontrar o tesouro escondido. Boa sorte!")

def obter_comando():
    comando = input("\nPara onde você vai? (norte, sul, leste, oeste, voltar, sair): ").lower()
    return comando

def processar_comando(comando, localizacao, local_anterior):
    if comando == "norte":
        if localizacao == "floresta":
            print("\nVocê encontra uma cabana abandonada.")
            return "cabana", localizacao
        else:
            print("\nVocê não pode ir para o norte daqui.")
    elif comando == "leste":
        if localizacao == "floresta":
            print("\nVocê chega a um rio de águas turbulentas.")
            return "rio", localizacao
        else:
            print("\nVocê não pode ir para o leste daqui.")
    elif comando == "voltar":
        if local_anterior:
            print(f"\nVocê retorna para {local_anterior}.")
            return local_anterior, localizacao
        else:
            print("\nVocê está no início e não pode voltar mais.")
    elif comando in ["sul", "oeste"]:
        print("\nVocê não pode ir para essa direção daqui.")
    elif comando == "sair":
        print("\nObrigado por jogar!")
        return "sair", localizacao
    else:
        print("\nComando inválido. Tente novamente.")
    return localizacao, local_anterior

def explorar_localizacao(localizacao, inventario):
    if localizacao == "cabana":
        if "chave" not in inventario:
            print("\nDentro da cabana, você encontra uma chave enferrujada.")
            inventario.append("chave")
        else:
            print("\nA cabana está vazia agora.")
    elif localizacao == "rio":
        if "chave" in inventario:
            print("\nVocê usa a chave para destravar um mecanismo na ponte e atravessá-la.")
            print("\nVocê encontrou um tesouro escondido! Parabéns!")
            return "tesouro"
        else:
            print("\nHá uma ponte frágil sobre o rio, mas você precisa de algo para atravessá-la.")
    return localizacao

def jogar():
    localizacao = "floresta"
    local_anterior = None
    inventario = []
    mostrar_intro()

    while True:
        comando = obter_comando()
        if comando == "sair":
            break
        localizacao, local_anterior = processar_comando(comando, localizacao, local_anterior)
        if localizacao == "sair":
            break
        localizacao = explorar_localizacao(localizacao, inventario)
        if localizacao == "tesouro":
            break

    print("\nFim do jogo. Até a próxima!")

jogar()
