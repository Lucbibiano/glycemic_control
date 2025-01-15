import { Injectable } from "@nestjs/common";
import { COLOR_RATE, RATE, TYPE_LEVEL } from "../enum/glycemic_level.enum";
import { RegisterLevelRate } from "../dto/register_level.rate.dto";
import axios from 'axios';

@Injectable()
export class GlycemicLevelService {

    // WEBHOOK DO TEAMS DA FIAP
    private readonly webHookUrl = "https://fiapcom.webhook.office.com/webhookb2/62c739a1-e669-4fb7-aa95-b994ed843e16@11dbbfe2-89b8-4549-be10-cec364e59551/IncomingWebhook/2e0cd045b31d4a6fb85dc698983198d9/0eaa375e-b457-47d7-9870-519e14bb9e31/V2qTDlSle6jEYDXr188XJHLj4ObiGkjemnosbQlXHpSgo1";

    public async sendTeamsNotification(message: string) {

        const messageObj = {
            text: message
        }

        try {
            // await axios.post(this.webHookUrl, messageObj);
        } catch(error) {
            console.error('Erro ao enviar mensagem para o Teams:', error.message);
        }
    }

    public setGlycemitRate(level: number, type: string): RegisterLevelRate {
        if (type === TYPE_LEVEL.FAST) {
            if (level < 70 || (level >= 100 && level <= 125)) {
                return  {
                    rate: RATE.ALERT,
                    rateColor: COLOR_RATE.YELLOW
                }
            } else if (level > 70 && level < 100) {
                return  {
                    rate: RATE.NORMAL,
                    rateColor: COLOR_RATE.GREEN
                }
            } else if (level >= 126) {
                return  {
                    rate: RATE.CRITICAL,
                    rateColor: COLOR_RATE.RED
                }
            }
        } else {
            if (level < 70) {
                return  {
                    rate: RATE.ALERT,
                    rateColor: COLOR_RATE.YELLOW
                }
            } else if (level >= 140 && level < 200) {
                return  {
                    rate: RATE.NORMAL,
                    rateColor: COLOR_RATE.GREEN
                }
            } else if (level >= 200) {
                return  {
                    rate: RATE.CRITICAL,
                    rateColor: COLOR_RATE.RED
                }
            }
        }

    }
}