import { apikey, sequence_id, showBrowser } from "./config";

import { browser } from "@crawlora/browser";

export default async function ({ playersName }: { playersName: string }) {
  const names = playersName
    .trim()
    .split("\n")
    .map((v) => v.trim());

  await browser(
    async ({ page, wait, output, debug }) => {
      let continueClicked = false;
      for await (const name of names) {
        await page.goto(
          "https://www.atptour.com/en/players?matchType=Singles&rank=Top%2010&region=all",
          { waitUntil: "networkidle2" }
        );

        await page.type('input[class="input-search"]', name);
        await wait(2);
        if (!continueClicked) {
          const continueBtn = await page.$(".atp_button--continue");
          if (continueBtn) {
            await page.waitForSelector(".atp_button--continue", {
              visible: true,
            });
            await continueBtn.click();
            continueClicked = true; // Mark as clicked
            debug("Clicked the continue button");
          } else {
            debug("No continue button found, moving on");
          }
        }

        await wait(3);
        //  await page.waitForSelector(".player-list li", { visible: true });

        const playerFound = await page.$(".player-list li:first-child");
        if (!playerFound) {
          debug(`No players found for: ${name}`);
          continue;
        }

        await playerFound.click();
        debug(`Clicked on the first player: ${name}`);

        await page.waitForNavigation({ waitUntil: ["networkidle2"] });

        await wait(2);

        const basicData = await page.evaluate(() => {
          const single_ytd_rank =
            (document.getElementsByClassName("stat")[0] as HTMLElement)
              ?.innerText || "Rank not found";

          const single_ytd_move =
            (document.getElementsByClassName("move")[0] as HTMLElement)
              ?.innerText || "move not found";

          const single_ytd_W_L =
            (document.getElementsByClassName("wins")[0] as HTMLElement)
              ?.innerText || "W-L not found";

          const single_ytd_titles =
            (document.getElementsByClassName("titles")[0] as HTMLElement)
              ?.innerText || "titles not found";

          const single_ytd_prize_monney =
            (document.getElementsByClassName("prize_money")[0] as HTMLElement)
              ?.innerText || "prize money not found";

          const single_career_Career_High_Rank =
            (document.getElementsByClassName("stat")[1] as HTMLElement)
              ?.innerText || "Rank not found";
          const single_career_W_L =
            (document.getElementsByClassName("wins")[1] as HTMLElement)
              ?.innerText || "W-L not found";

          const single_career_titles =
            (document.getElementsByClassName("titles")[1] as HTMLElement)
              ?.innerText || "titles not found";

          const single_career_prize_money =
            (document.getElementsByClassName("prize_money")[1] as HTMLElement)
              ?.innerText || "prize money not found";

          const player_name =
            (
              document.getElementsByClassName("player_name")[0]
                .children[0] as HTMLElement
            )?.innerText || "";
          const age =
            (
              document.getElementsByClassName("pd_left")[0].children[0]
                .children[1] as HTMLElement
            )?.innerText || "";

          const weight =
            (
              document.getElementsByClassName("pd_left")[0].children[1]
                .children[1] as HTMLAreaElement
            )?.innerText || "";

          const height =
            (
              document.getElementsByClassName("pd_left")[0].children[2]
                .children[1] as HTMLAreaElement
            )?.innerText || "";

          const turned_pro =
            (
              document.getElementsByClassName("pd_left")[0].children[3]
                .children[1] as HTMLAreaElement
            )?.innerText || "";

          const country =
            (
              document.getElementsByClassName("pd_right")[0].children[0]
                .children[1] as HTMLElement
            )?.innerText || "";

          const birthplace =
            (
              document.getElementsByClassName("pd_right")[0].children[1]
                .children[1] as HTMLElement
            )?.innerText || "";

          const plays =
            (
              document.getElementsByClassName("pd_right")[0].children[2]
                .children[1] as HTMLElement
            )?.innerText || "";

          const socialLinks: {
            instagram: string;
            twitter: string;
            facebook: string;
            tiktok: string;
          } = {
            instagram: "",
            twitter: "",
            facebook: "",
            tiktok: "",
          };
          const socialContainer = document.querySelector(".social ul");
          if (socialContainer) {
            const socialItems = socialContainer.querySelectorAll("li a");
            socialItems.forEach((item: any) => {
              const href = item.getAttribute("href");
              if (href?.includes("instagram.com")) {
                socialLinks.instagram = href;
              } else if (href?.includes("twitter.com")) {
                socialLinks.twitter = href;
              } else if (href?.includes("facebook.com")) {
                socialLinks.facebook = href;
              } else if (href?.includes("tiktok.com")) {
                socialLinks.tiktok = href;
              }
            });
          }

          return {
            player_name,
            age,
            weight,
            height,
            turned_pro,
            country,
            birthplace,
            plays,
            single_ytd_rank: single_ytd_rank.split("\n")[0],
            single_ytd_move: single_ytd_move.split("\n")[0],
            single_ytd_W_L: single_ytd_W_L.split("\n")[0],
            single_ytd_titles: single_ytd_titles.split("\n")[0],
            single_ytd_prize_monney: single_ytd_prize_monney.split("\n")[0],
            single_career_Career_High_Rank:
              single_career_Career_High_Rank.split("\n")[0],
            single_career_W_L: single_career_W_L.split("\n")[0],
            single_career_titles: single_career_titles.split("\n")[0],
            single_career_prize_money: single_career_prize_money.split("\n")[0],
            ...socialLinks,
          };
        });

        await page.waitForSelector("a[class=tab-switcher-link]", {
          visible: true,
        });
        await page.click("a[class=tab-switcher-link]");
        await wait(3);

        const doublesFilterData = await page.evaluate(() => {
          const doubles_ytd_rank =
            (document.getElementsByClassName("stat")[0] as HTMLElement)
              ?.innerText || "Rank not found";

          const doubles_ytd_move =
            (document.getElementsByClassName("move")[0] as HTMLElement)
              ?.innerText || "move not found";

          const doubles_ytd_W_L =
            (document.getElementsByClassName("wins")[0] as HTMLElement)
              ?.innerText || "W-L not found";

          const doubles_ytd_titles =
            (document.getElementsByClassName("titles")[0] as HTMLElement)
              ?.innerText || "titles not found";

          const doubles_ytd_prize_monney =
            (document.getElementsByClassName("prize_money")[0] as HTMLElement)
              ?.innerText || "W-L not found";

          const doubles_career_Career_High_Rank =
            (document.getElementsByClassName("stat")[1] as HTMLElement)
              ?.innerText || "Rank not found";

          const doubles_career_W_L =
            (document.getElementsByClassName("wins")[1] as HTMLElement)
              ?.innerText || "W-L not found";

          const doubles_career_titles =
            (document.getElementsByClassName("titles")[1] as HTMLElement)
              ?.innerText || "titles not found";

          const doubles_career_prize_money =
            (document.getElementsByClassName("prize_money")[1] as HTMLElement)
              ?.innerText || "Prize money not found";

          return {
            doubles_ytd_rank: doubles_ytd_rank.split("\n")[0],
            doubles_ytd_move: doubles_ytd_move.split("\n")[0],
            doubles_ytd_W_L: doubles_ytd_W_L.split("\n")[0],
            doubles_ytd_titles: doubles_ytd_titles.split("\n")[0],
            doubles_ytd_prize_monney: doubles_ytd_prize_monney.split("\n")[0],
            doubles_career_Career_High_Rank:
              doubles_career_Career_High_Rank.split("\n")[0],
            doubles_career_W_L: doubles_career_W_L.split("\n")[0],
            doubles_career_titles: doubles_career_titles.split("\n")[0],
            doubles_career_prize_money:
              doubles_career_prize_money.split("\n")[0],
          };
        });

        await wait(2);
        await page.waitForSelector("a[href=player-stats]", { visible: true });
        await page.click("a[href=player-stats]");
        await wait(3);
        const statics = await page.evaluate(() => {
          const Aces =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[0] as HTMLElement
            ).innerText || "";

          const doubles_faults =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[1] as HTMLElement
            ).innerText || "";

          const first_serve =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[2] as HTMLElement
            ).innerText || "";

          const first_serve_points_won =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[3] as HTMLElement
            ).innerText || "";

          const second_serve_points_won =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[4] as HTMLElement
            ).innerText || "";

          const break_point_faced =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[5] as HTMLElement
            ).innerText || "";

          const break_point_saved =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[6] as HTMLElement
            ).innerText || "";

          const service_games_played =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[7] as HTMLElement
            ).innerText || "";

          const service_games_won =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[8] as HTMLElement
            ).innerText || "";

          const total_service_points_won =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[0].children[1]?.children[9] as HTMLElement
            ).innerText || "";

          const first_serve_return_points_won =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[1].children[1]?.children[0] as HTMLElement
            ).innerText || "";

          const second_serve_return_points_won =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[1].children[1]?.children[1] as HTMLElement
            ).innerText || "";

          const break_point_opportunities =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[1].children[1]?.children[2] as HTMLElement
            ).innerText || "";

          const break_point_converted =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[1].children[1]?.children[3] as HTMLElement
            ).innerText || "";

          const return_games_played =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[1].children[1]?.children[4] as HTMLElement
            ).innerText || "";

          const return_games_won =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[1].children[1]?.children[5] as HTMLElement
            ).innerText || "";

          const return_points_won =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[1].children[1]?.children[6] as HTMLElement
            ).innerText || "";

          const total_points_won =
            (
              document.getElementsByClassName("statistics_content")[0]
                ?.children[1].children[1]?.children[7] as HTMLElement
            ).innerText || "";

          return {
            Aces: Aces.split("\n")[1],
            doubles_faults: doubles_faults.split("\n")[1],
            first_serve: first_serve.split("\n")[1],
            first_serve_points_won: first_serve_points_won.split("\n")[1],
            second_serve_points_won: second_serve_points_won.split("\n")[1],
            break_point_faced: break_point_faced.split("\n")[1],
            break_point_saved: break_point_saved.split("\n")[1],
            service_games_played: service_games_played.split("\n")[1],
            service_games_won: service_games_won.split("\n")[1],
            total_service_points_won: total_service_points_won.split("\n")[1],
            first_serve_return_points_won:
              first_serve_return_points_won.split("\n")[1],
            second_serve_return_points_won:
              second_serve_return_points_won.split("\n")[1],
            break_point_opportunities: break_point_opportunities.split("\n")[1],
            break_point_converted: break_point_converted.split("\n")[1],
            return_games_played: return_games_played.split("\n")[1],
            return_games_won: return_games_won.split("\n")[1],
            return_points_won: return_points_won.split("\n")[1],
            total_points_won: total_points_won.split("\n")[1],
          };
        });

        await output.create({
          sequence_id,
          sequence_output: { ...basicData, ...doublesFilterData, ...statics },
        });

        console.log("data", { ...basicData, ...doublesFilterData, ...statics });
        await wait(5);
      }
    },
    { showBrowser, apikey }
  );
}
