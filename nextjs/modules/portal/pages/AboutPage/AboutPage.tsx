import styles from "./AboutPage.module.scss";
import { Divider } from "@mui/material";
import cn from "classnames";

const AboutPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.topHeader}>
                <img src="/images/picture/tg-star.svg" />
                <div className={styles.title}>
                    Инвестируй звезды, а зарабатывай рубли
                </div>
            </div>
            <Divider orientation="horizontal" flexItem />
            <div className={styles.howInvestWrapper}>
                <div className={cn(styles.title, styles.big)}>
                    Как это работает?
                </div>
                <div className={styles.row}>
                    <div className={styles.mainText}>
                        1. Пополни баланс на минимальную сумму ставки
                    </div>
                    <span className={styles.subText}>
                        Баланс можно пополнить с помощью Telegram-Star на вашем
                        аккаунте, средства сразу же зачислятся на счёт. Для
                        этого нажмите на профиль - пополнить баланс
                    </span>
                </div>
                <div className={styles.row}>
                    <div className={styles.mainText}>
                        2. Выбери компанию в которую готов инвестировать и
                        оформи сделки
                    </div>
                    <span className={styles.subText}>
                        Выбрать компанию для ставки можно на главной странице.
                        Обрати внимание, за оформление и закрытие сделки
                        списывается комиссия.
                    </span>
                </div>
                <div className={styles.wrapperProfit}>
                    <div className={styles.textLeft}>
                        Если акции компании вырастут на 1%
                    </div>
                    <div className={styles.rightBlock}>
                        <div className={styles.rightText}>Вы получите</div>
                        <div className={styles.textProfit}>
                            + 1 % от суммы ставки
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.mainText}>
                        3. Зафиксируй прибыль закрыв ставку
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AboutPage;
