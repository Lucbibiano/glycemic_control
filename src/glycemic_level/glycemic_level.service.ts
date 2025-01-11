import { Injectable } from "@nestjs/common";
import { COLOR_RATE, RATE, TYPE_LEVEL } from "./enum/glycemic_level.enum";
import { RegisterLevelRate } from "./dto/register_level.rate.dto";

@Injectable()
export class GlycemicLevelService {

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