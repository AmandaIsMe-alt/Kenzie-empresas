export class Aside {
    static getPages() {
        const pages = {
            0: {
                categoria: 'Início',
                links: {
                    0: {
                        title: 'Voltar ao dashboard',
                        link: 'dashboard.html'
                    }
                }
            },

            1: {
                categoria: 'Setores',
                links: {
                    0: {
                        title: 'Ver todos os setores',
                        link: 'setores.html'
                    }
                }
            },

            2: {
                categoria: 'Empresas',
                links: {
                    0: {
                        title: 'Criar empresa',
                        link: 'criar-empresa.html'
                    },

                    1: {
                        title: 'Ver empresas cadastradas',
                        link: 'empresas.html'
                    }
                }
            },

            3: {
                categoria: 'Funcionários / Usuários',
                links: {
                    0: {
                        title: 'Ver usuários não contratados',
                        link: 'usuarios-normais.html'
                    }
                }
            }
        }

        return pages
    }

    static renderizarAside () {

        const user = localStorage.getItem('@kenzie:User_id')
        const admin = localStorage.getItem("@kenzie:admin")

        if(!user || user == 'undefined') {
            window.location.assign('../../index.html')

        } else {
            const sidebarMenu = document.querySelector('#sidebarMenu')
            const contentPage = document.querySelector('#contentPage')

            if( admin == 'true') {

                const divSticky = document.createElement('div')
                divSticky.classList.add('position-sticky', 'pt-3', 'sidebar-sticky')

                const pages = Aside.getPages()

                for (const key in pages) {
                    if (Object.hasOwnProperty.call(pages, key)) {
                        const categoria = document.createElement('h6')
                        const ulLista = document.createElement('ul')

                        categoria.classList.add('sidebar-heading', 'd-flex', 'justify-content-between', 'align-items-center', 'px-3', 'mt-4', 'mb-1', 'text-muted', 'text-uppercase')
                        ulLista.classList.add('nav', 'flex-column', 'mb-2')

                        categoria.innerHTML = pages[key].categoria
                        let links = pages[key].links

                        for (const link in links) {
                            if (Object.hasOwnProperty.call(links, link)) {
                                const li = document.createElement('li')
                                const a = document.createElement('a')

                                li.classList.add('nav-item')
                                a.classList.add('nav-link')

                                a.href = links[link].link
                                a.innerText = links[link].title

                                li.append(a)
                                ulLista.append(li)
                            }
                        }

                        divSticky.append(categoria, ulLista)
                    }
                }

                sidebarMenu.append(divSticky);
            } else {
                contentPage.classList.remove('col-md-9', 'col-lg-10')
                contentPage.classList.add('col-md-12')
                sidebarMenu.remove()
            }
        }
    }
}