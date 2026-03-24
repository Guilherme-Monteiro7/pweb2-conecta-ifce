import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'

const faq = [
  {
    question: 'Quem pode Particiipar do ConectaIFCE?',
    answer:
      'todos os membros da comunidade acadêmica IFCE: alunos, professores técnico-administrativos. e egressos. basta ter um email institucional do IFCE para se cadastrar e participar da plataforma.',
  },

  {
    question: 'Como funciona a formação de grupos de estudo?',
    answer:
      'Você pode criar um grupo de estudo sobre qualquer tema, convidar membros e compartilhar materiais. Os grupos podem ser públicos ou privados, e você pode participar de quantos grupos quiser.',
  },

  {
    question: 'Posso Divulgar meu projeto de pesquisa?',
    answer:
      'sim! A plataforma possui uma area dedicada para publicação de projetos de pesquisa, extensão e inovação.',
  },

  {
    question: 'A plataforma esta disponivel em dispositivos móveis?',
    answer:
      'sim, o ConectaIFCE é totalmente responsivo e funciona perfeitamente em smartphones e desktops.',
  },

  {
    question: 'Como funcionam as badges e conquistas?',
    answer:
      'As badges são conquistas virtuais que os usuários podem ganhar ao participar ativamente da plataforma, como criar grupos de estudo, publicar projetos ou ajudar outros membros. Elas servem para reconhecer e incentivar a participação na comunidade.',
  },
]

function FaqSection() {
  return (
    <section className="bg-card py-20" id="faq-section">
      <div className="container-main max-w-3xl">
        <div className="mx-auto text-center">
          <p className="text-primary uppercase text-sm font-semibold tracking-wide">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-bold text-balance text-foreground tracking-tight">
            Perguntas frequentes
          </h2>
        </div>

        <Accordion type="single" collapsible className=" mt-16 w-full">
          {faq.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-base font-medium text-foreground hover:text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FaqSection
