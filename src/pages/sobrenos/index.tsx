// libs
import { NextSeo } from "next-seo";
import {
    Container,
    Typography,
    Grid,
    Box,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { env } from "@/env";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

// Ícones do Material UI
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function SobreNos() {
    return (
        <>
            <NextSeo title="Sobre Nós - Antiquário" />

            <Container>
                {/* Título da página */}
                <SectionTitle>Nossa História</SectionTitle>

                {/* Seção de introdução */}
                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        lineHeight: 1.7,
                        textAlign: "justify",
                    }}
                >
                    O Antiquário, localizado em São Manuel, no interior de São
                    Paulo, nasceu de forma simples e orgânica, evoluindo para se
                    tornar um ponto de referência em antiguidades e móveis
                    rústicos.
                </Typography>

                <Divider />

                {/* História do negócio */}
                <Grid container spacing={4} sx={{ marginTop: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Image
                                src="/static/loja_ficticia.webp"
                                alt="Imagem da loja antiga"
                                width={550}
                                height={300}
                                style={{ borderRadius: "8px" }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="body1"
                            sx={{
                                marginBottom: 2,
                                lineHeight: 1.7,
                                textAlign: "justify",
                            }}
                        >
                            O antiquário começou com a venda de algumas peças
                            que estavam guardadas no fundo de casa.
                            Inicialmente, eram objetos comuns, mas a abertura de
                            uma loja em um ponto mais movimentado trouxe a
                            oportunidade de adquirir e reformar verdadeiras
                            relíquias antigas, graças à ajuda de clientes que
                            também ofereciam suas peças.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                marginBottom: 2,
                                lineHeight: 1.7,
                                textAlign: "justify",
                            }}
                        >
                            Com o aumento da demanda, eu e minha esposa passamos
                            a focar principalmente em antiguidades. Ela se
                            encarrega da tapeçaria, enquanto eu cuido da
                            restauração dos móveis. A partir desse momento,
                            deixamos de lado os móveis modernos para nos
                            concentrar nas peças com história.
                        </Typography>
                    </Grid>
                </Grid>

                {/* Foco nas antiguidades e móveis rústicos */}
                <SectionTitle marginTop={2}>
                    Foco em Antiguidades e Móveis Rústicos
                </SectionTitle>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="body1"
                            sx={{
                                marginBottom: 2,
                                lineHeight: 1.7,
                                textAlign: "justify",
                            }}
                        >
                            Hoje, nosso foco é restaurar e vender antiguidades
                            de alta qualidade. Com peças que contam histórias de
                            várias gerações, nosso trabalho vai além da venda, é
                            um resgate cultural. Além disso, agregamos à nossa
                            loja móveis rústicos de madeira de demolição, pela
                            durabilidade e pela importância de reciclar e
                            preservar materiais que possuem grande valor
                            ambiental.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                marginBottom: 2,
                                lineHeight: 1.7,
                                textAlign: "justify",
                            }}
                        >
                            Nossos clientes se tornam amigos e a melhor
                            propaganda que temos é a recomendação daqueles que
                            já nos visitaram. Ao longo de 8 anos no mercado, nos
                            consolidamos como referência no ramo, sempre com o
                            compromisso de oferecer peças únicas e reformadas
                            com carinho e dedicação.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Image
                                src="/static/movel_reformado.png"
                                alt="Móveis rústicos de madeira"
                                width={550}
                                height={300}
                                style={{ borderRadius: "8px" }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* Missão */}
                <SectionTitle marginTop={2}>Nossa Missão</SectionTitle>

                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        lineHeight: 1.7,
                        textAlign: "justify",
                    }}
                >
                    Acreditamos na importância de preservar a história por meio
                    de antiguidades e promover a sustentabilidade com o uso de
                    materiais reciclados. Cada peça que restauramos carrega
                    memórias e emoções, e estamos sempre à disposição para
                    ajudar nossos clientes a encontrar a peça perfeita que
                    complemente suas casas e suas histórias.
                </Typography>

                <Divider sx={{ marginTop: 6 }} />

                {/* Formas de Contato e Mapa */}
                <SectionTitle marginTop={2}>
                    Contatos e Localização
                </SectionTitle>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        {/* Lista de Contatos com Ícones */}
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Endereço"
                                    secondary="Av. José Horácio Mellão, 1426 - Vila Ipiranga, São Manuel - SP, 18650-000"
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Telefone"
                                    secondary="(14) 1234-5678"
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <WhatsAppIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="WhatsApp"
                                    secondary="(14) 98765-4321"
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <EmailIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Email"
                                    secondary="contato@antiquario.com"
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Google Maps Embed */}
                        <Box sx={{ borderRadius: "8px", overflow: "hidden" }}>
                            <iframe
                                src={env.NEXT_PUBLIC_MAP_LOCATION_URL}
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
