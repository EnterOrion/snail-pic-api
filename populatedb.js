#! /usr/bin/env node

console.log(
  "This script populates the starting set of snail pictures to the database. Specified database as argument - e.g.: node populatedb mongodb+srv://exampleUser:examplePassword@cluster0.envg0u2.mongodb.net/?retryWrites=true&w=majority"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const SnailPic = require("./models/SnailPic");

const snailPics = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createSnailPics();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function snailPicCreate(dateTaken, photoUrl, category, description) {
  snailPicDetail = {
    dateTaken: dateTaken,
    photoUrl: photoUrl,
    category: category,
    description: description,
  };

  const snailPicData = new SnailPic(snailPicDetail);

  await snailPicData.save();
  snailPics.push(snailPicData);
  console.log(`Added snail picture: ${description}, Taken on: ${dateTaken}`);
}

async function createSnailPics() {
  console.log("Adding Snail Pics");
  await Promise.all([
    snailPicCreate(
      "6/29/20",
      "https://previews.dropbox.com/p/thumb/AB2pAL00dB8YQpM89iMeUKxacz8z3V2npOuDAeOl6sQzEG5yrxMWFF6NDXuHBpB84yDERWbBNi55mpiJ-5PgEsDVJj37rXEv1vq-EblTth9_uVVV2hv49pJnd0bdbnn8kR732rrskdn-erTjnu8BJyP6_K3pA8p19AnqERZCdhRJAFGJ70jaPSC-VU02pp-qvFYez6qpaMgF6GheTJwhKkU8C0QXWCfU90iXQxr3O7ziKjbQhsdo0glsCaxKR3NdavQvpPwI7tDf1vVRk5EUKQeOv3PdGf-QkHb6mtZXjUlDuWggHvreGZozypcFuwVQh1yc1lU-5yF41gNXBwXgZoOtulw6pyemTQTo0K0v97e9Rkm5VcRxT875MfSGtAayZKQ/p.jpeg",
      "Live",
      "The very first snail pic!"
    ),
    snailPicCreate(
      "9/28/20",
      "https://previews.dropbox.com/p/thumb/AB7UW3UUYZVcNy7jw-HtsPXQTGglkpIHB2u5zHhYT2aQMp4aaqh0rrKVeiSuG1-p4H5qGwtB_rB9qkbNTaDmNPKoEz-dC_i0_jVD01fmwrjLPjL2xc9n6FlKh9ZgkB7Ew0fEAgiqSN94T5m-pSzFFBGdaqWZh9o5Cwv5ngHwb218zL7chfFJBwR-3nwH4u4ERtNpzO6HdT6SEiaZf5yE-lRzeMDWl-Ow_a9F-4zR9t_qtqv-z4sjp_MNM7qwDWIv0Tyv88q_x3rqAja8UZVvdSooRD2UVnV-YZ2k2TSVbtZY5wlXP5zEfuEk9FRxU-vfwens55n5FcUgTugXcBKztS741IKjeSyoDxGQYgwAy9GmEAuq0nxUCW8R8uDTPDpKk8k/p.jpeg",
      "2D",
      "Found on the side of a building on a warm fall day."
    ),
    snailPicCreate(
      "10/16/20",
      "https://previews.dropbox.com/p/thumb/AB6Mvn_Vy_1g6I1RLWIzl3yXLuHY2ldBGIPgJaISztySUfnx6F92Y5sI_xpt25HG-WwxapUi45DI3Uyd7B3WEhlC_5Hbb-Xr_gg3-KOrFrgHzD-WcPPDu33IjZaD9zjBXViYuFGj0kvpgzxQBSEf0AnhEIzHmWN_afIzLUuM8kJRMxT_RxCy5EoJSy8qVO2hzJDLwbuHvB0uISdSPUZLj12JaeCv95FFYJ63yhyT0yfa08ls5DEBzu-vX2iM1V8zsAoSDcwn8jnfFEhFBrThBimq97AcOkw-mpQ6qXvegK16qi5pgPzHAvkzlvynL8udTRYVH_iuc8zXAfBhj4SG_VCiwrzkI_30WTbgt4TLd48pfN3qr072cKm6luPJCH5JXUU/p.jpeg",
      "2D",
      "Found among other painted creatures on a bridge."
    ),
    snailPicCreate(
      "3/29/21",
      "https://previews.dropbox.com/p/thumb/AB6znd_kJXBwfEqjbdxmpE8uybVyGqjy7CLGRSK-pClTJnj4VOGSZPtZenTFWLI6rxQ92dZQT2-1aYwm639i9oY01URgfdCBNhTR6TO23lNUK8v_8HyWH8sotw43YYj3RGsGR2Qn6SLNWPxNwZEx42NPTU4vl1Fpwvz13De1L0uzUe5K1AgdGWKPNcVikY-AVZJ5q-iMz7mJ3MJfVQfrgLZ6WpblVkEPAcb0YN8gjxDRQuLLbgaXtubE_8syjGHgickkh9K1EUihQ_iRmfiZ44PoYNWRsn8C9Pvrb-SV1ZgEvWBVf8W6u56pbBKoB69WMl0G-xqfLzsJI5zhbvNdo30bv22WVXsBDl3vYl27wpSmF6VF_6ntCR6ZKUsNSoiHRHA/p.jpeg",
      "3D",
      "A cute statue in a garden shop."
    ),
    snailPicCreate(
      "6/14/21",
      "https://previews.dropbox.com/p/thumb/AB6E29RK6w2XALHZpGoS-319hheQVi9X2wocDgILXHlHvMQ9jOZB-k-jYet4QGsWx38ugj3ojg3dNw9nEyx-eBeomRfgmqw87yE2Eky3lOQUdA_pqKdaT7D0q_hsggQ25QCuECr4fhvonz8dsfLQQG07bJ2HM8VNAR-EKTDgVJM22tcIzXMFeYa5gFFEwy9H0jbbKUH6w6DZlM8XgnIovmKdNDTaRKxEAxHB1POrrbnXjvSgYS0-2inY8WJnyg6a8RHoy8Tci6mt5oJPNGbakxgRa9eR2lfqmBkyO9ee-1AquGm529-0W_GU1ekIKWt2Na1k_IE3TfFVnYnnkTm389wUmzeLPIoz2BpDMaM6AmBUQmCumIvRJnBafJK11ymvQCE/p.jpeg",
      "3D",
      "A well-crafted and adorable purple snail."
    ),
    snailPicCreate(
      "6/21/21",
      "https://previews.dropbox.com/p/thumb/AB6x2IwOKQxVQQPUn3f2yuwgHciPV9kn2grJ-tw9NC-JjgaEE6PCyXiQ2gLUF4qmPYJlAKV5ye1Ha24GcyKTnr3Y-UfjQxFp_AWpFs2B0AAOsoFISsk0cAEsD5te-zIWaGw9FPp9nJf2ZBihwoC9LClQUvt1IHUR0g-7ASu6YuvCO0kC7rX7cKu0b3zzZVxJG2unxN12qiOnma1pBXfXqfGjC1Xx9xBjeSFpDJ2EuyyZX3-HYTp7JBwFDA6zUh183b8aOmTkMBWaLUIg99sB8DUHjVYPCQ7OvU8IclGIqinMb70wXPJJvfDtu7HnOcG0RdUjn8f_sc8vZt6C7ZesKeaK19VpW5s1sVAB5vKqdRPq2tHft7jXwDZPTUNC1AiA7mg/p.jpeg",
      "3D",
      "A snail plush that my friend from Canada gifted me!"
    ),
    snailPicCreate(
      "7/2/21",
      "https://previews.dropbox.com/p/thumb/AB7De6lJMRVfp8dE3PvmsbId4InYwewgUgxYE01vIkyJxekWCEpy60VrPy4tpHCAdURUzXcSm7S4COUbCKZtvaJTHrh6Fx7k9UVfjoKI6ji4Hzj2pe2e55XMRdRPSQuoncxn9EajbIZi1RHlAA1KVK2QG0TO21_KliOhda2NK7bOpWbBfepflE87WggGBWfkk56w1fJ0aYg4wjiVxqVBKWIED214lEvTuk2VuCtcCdeTOsFqMynllLilapFEHCQQwmywvxCPMlm1k0QrnI8l4piUVfjHClbS99XWUCMC9aiyYuQk-4uCBdNGKbsfT_Bcx-_GaK0OAC6bmDaKajzQdS9lFewK3jQp1fSjxq8vFM5yV5ACewu8pLmkStpPFQv2J2U/p.jpeg",
      "Live",
      "Found on a walk on my local trail."
    ),
    snailPicCreate(
      "11/6/21",
      "https://previews.dropbox.com/p/thumb/AB4BiqsjlKqymEiWsddrcLwXUUSvacvznbxSxgYbZ_HtNPCKQEFIDTgjUL2GWsxLwlxAeVPJM5OuBJVIfNhWVhZmPAGN6hlvFM-wYPkdk_yeNuN2tk5tnWEt1i-ehBvEGydzUnfFHcE8Fibcol2wyqaGymMV2TtAhJSC2L2VJVv8wAfMn_NybH9M8nF72U4RO9mTg1gsakYN6X9M12qlYhdYrLL0WN72tCbGkp_Nj-mRTPbNQhf19BLf4FD1WDDAIGVj4DTWSj_tQ7HdKAqj77gzFiB0XM9s-O93PBnlgXJvpocTcgb5-aRPLYDNNoKX7uXXiW32WtBNUVgjKSFp-ZbmZQuufxoD7XTgB2MCoFDlPo1d1Ij2v8CaKQ9cXsinDXA/p.jpeg",
      "2D",
      "A cute sign to warn drivers to slow down."
    ),
    snailPicCreate(
      "11/26/21",
      "https://previews.dropbox.com/p/thumb/AB46J0WiMoKZQ2aOG1n2xvyMfHs53XBQMESDNs0FltxfC928QD5yQ8S8ZGCja5c8qF9tZ8Mz0rdhhc2fuhzUiX7WFwh1eX7lOev7ICx8hJ4RzzUftGUWl2zC3YzFD6v6OgFECSU8Jn2cc3YLKzhX2xUWh2WQgzK4A71SY6YGyqRCuCfOYc28q4x-TItRGtVQW3M56hov_p9JY_rNKx2S4HnYA7_srQhkKoBsj_GrT9hd8K9EZnkQxIgLUkG1b5GPZ_KEHRc-GvoueuuwLzLEgyjRIV_PMF5BurLSYUXSRcIbCL5BHnMEmoaqYdskrIRD6OhEJyhrdL1076duJalOIio8UBWQACATv3cnDfVIhz5RQ_lAm0tze9x1Br_T7CHMlrg/p.jpeg",
      "3D",
      "Found as a part of a magical garden diorama in someone's front yard!"
    ),
    snailPicCreate(
      "11/26/21",
      "https://previews.dropbox.com/p/thumb/AB7WZO1d_MML8yGrnEeJOj6Qm28XpPYA_uPdAHro_cVxg6IOcO7zO8q6IwLxEOWGKDA35shic9xdQXQKSQewO992dqnfCYFlamKfBIbn70eJSyfR2-uprPcmw_QGmgVQq766NRA2SCvvcX4ItuRGJWood8XG6Basstv9nhyaBb0Nx_AwOSdNghz_R105VvIxwbQPHtX5pRRq2I_w3bAE4jOtTMrAo1sn7dlaTlEcnHwcoF_xDKrTvL_J0a1LP9nBxcdM8-cM62UDBM6gR460ffFfqHapzTZjw3ilCvN17IEmJ00vgQSgLazTK2qGMrdpRWWOmYMGDcDHrvnJMPyGAGMZSgbGej_mUtECZigattzAuAvBhSW93i5pRFf_GiQQkHA/p.jpeg",
      "2D",
      "A sign to warn drivers to slow down in a neighborhood."
    ),
    snailPicCreate(
      "11/26/21",
      "https://previews.dropbox.com/p/thumb/AB7B96NN5YMXqCuGHN5N1RdomjCtJrUAsVGUeGJNlayLaO224a2ei34ofng31uBH5c0kJhr8yBBtsAIMVST5YKL8iUnvUMegvQYbbQLCFQc7DaapEEHh16kJxCC2F3d0op2Hh37CmhVRQypVWluxAQ8ZkCGvXEwWwoWBYV75MINpNEa5Lp-VFOKzEiQHKLUZ28weH5SI7epm0SfHV_wuuvurTbUF0qIwiJsU3cm5ZIQteSM4_QmxeLCD32-woU0QDlC9p8NnZN9hkxDEOJzI_XQ4XKMD3TaIzS6UpMwx0kfm_TQhCgzOrg1uyw2zqO-H4Rb2Q_npM5nvQo0u9L6AaSLsQrftrcCg9KF9Bi0Rigp54EQ2pqdZmK7A2Sd8H1ivox4/p.jpeg",
      "2D",
      "The best sticker on that sign post."
    ),
    snailPicCreate(
      "2/10/22",
      "https://previews.dropbox.com/p/thumb/AB5jBRRk2NsCbEs_rSOYIUP3c2cEanPb7stTCGg7ES296BrIeJyyjd9S370YPSqW7i0ELRcki9EEOP1GnyjfDD8uyb3B70x_zSobikjcLqSf0rxlGbddq9zPFsym92z-tpRBP1rq0P3JefBdnAUXawKGULa609UTYYEp9XiEH6QsNiOUyOJwWsgcLARg5X45sqqKZzMHKI_sKXqYs7e8w9Ns2IM-iZ3JhqkGg0bf9Y_apme2mY6kD3fSwn6vd7O0MEjmjdzZ4g7AKCyT4p6FRaoHeDfQfJIFeuf8q2vVbtPeEKQ469TCb0aeqo8rDQpGW5m8y1EyPMnJNyNrdoH0GID8SAP0xJ-_j4Nh7U-NW72UAIkPqXfnImOBqSXXFjHrdwg/p.jpeg",
      "2D",
      "A lovely snail partnership! A good first snail pic for 2022."
    ),
    snailPicCreate(
      "4/22/22",
      "https://previews.dropbox.com/p/thumb/AB4ZtW807zvIIULe8bIVoXoF9B9caydWBxwWj1L_r4a8MsshGPKOkCl6AB6sGD4vJyz8JQPWdYNeG3hXHeN1UTvNw57sE0yKuwGTW-iFugfPSEwk73zyuCm8MxghW6wsamEdg6rYY50-PlMylfojUqIps5nM8zZpoltJ8oC5t_zkW17pySQ67UKpffBxv1HLmr3N8zNJnjdioG6IPSu7yfbbWGz-aZHTqU7b_7Xjtua0KvMRSdR_RCvVG0kJFKkjCfl4iksveCWAKv3YIti3-rJuZiPWQoa-5QGfzutsxQlNaxKQVo1Ct8aBtmOkMz2BaEJ7gptLNwp7EO43Fmg5dXf2Xkefj0UbJCmt_pSG3rDjhfeOdlsy2vqYlxlqoR1kvx8/p.jpeg",
      "2D",
      "A psychedelic rainbow snail chilling on the back of a sign."
    ),
    snailPicCreate(
      "4/28/22",
      "https://previews.dropbox.com/p/thumb/AB6q7pycFS76kq5A-P_58fSzitKXFKf82Tf98cgbTDvgoVtanEQmvyXNgQuvyqBxwR7haKsqxSr2BULTTDMxVWbQS7v2bqPTXiQkMQrDUSHPMO3gDMX5_sNRcMeWDxPfWr2PGNmMleMxUe2UWe5jL9IPp-1UJHPlIJc6s_JkwlLOec-wGij0uzhOfxRx3A8jR6nAkspveHyDZJEK7eFpPOBOf1YfqD_y5DVwXBBXLT5rVNmK-fxU_6Ww5eSCJEx8x3LxJ4iyNxk4NzfNJqEWuhcvhzlpZ1BT_QtmfHU30txlMBOL-ZkR9vFIVCbC6WNP3Cm9neG8tYLcOdrzbI6jumC-KVUgZyagwcOw_vLvPTp_dkhHxTkOW2TIlyTFA7amMfE/p.jpeg",
      "3D",
      "A gorgeous painted snail."
    ),
    snailPicCreate(
      "5/29/22",
      "https://previews.dropbox.com/p/thumb/AB7ZgfNC5NULB6rvWFaZRg8yFzj0XOkahbXMbG1UC2k2X6Cmiu21rsUER0zGWpKMRetGx39Omw1TUYa_ug1Yvw4zCyapIzvnQ_lcnLuzyuHbpoJjE1Bb6JERLGl2ONYmZyM-zrsokkcgaVCzvcmi2Zippj4rKF9HlOVJ3pEZ9XomsLOS3hWtoQ9Oghdz3VBnVjfqC-Uwm8xFDo1u_1sTedD8izZLCIadjIQpX5ndR5o31makU0FwG0hfkD6GPYXNbVOs49t0BtQLL1VCYPnnwNGBFqjWySgKcQpu1zevg3cKHcUQDIzL893DZkP9HH4je_39X9jzlqCZTXnCCr_pt53J7OFm9uJnDs8JSPbBjJF4QMS9f43MWTi8nmB5FuwvXiA/p.jpeg",
      "2D",
      "A great snail pun and on a journal! What a deal."
    ),
    snailPicCreate(
      "6/1/22",
      "https://previews.dropbox.com/p/thumb/AB7upoheyaUwQelcsz85OuanhgRHslaBwDzJqqF0mPc8zoPG_32EqGO0p2dPCd_Tlwo4NEriQMfprluHAnffpwO6c9Lxe2ryi2LP1kVknfQS_H3x_429YQ7hC256mXurQNjI8f89hqrzUeeW0RFDgpNrHbJX7P_pIZm7rIE2xpD4cne3KTAlHfiargjaUfjstaPycj8fDzTwr5qcFkcC5Ga_GUTXM5RxNoiSSfrAWX5FWmaMdQAZg8Hcc_JQ4YWYmhT4J-Qqbmd0Zm0QsWlCUhbSFnWAnlPhlIO9lGKWMrWiIaMdgRMpjLAR-58OiVeCZZrogbpNsug4P1wg7QD4SyS19X3sRUgiN204bTqR7mS0Eq9zv_IqBf7mJ8hSXSZSVmQ/p.jpeg",
      "2D",
      "A wholesome snail message."
    ),
    snailPicCreate(
      "6/29/22",
      "https://previews.dropbox.com/p/thumb/AB7GuO3WiY24yprmvRxaAL2WJtYAnnOk8GD6XxyYr7mue-nkfP3iA5Nwn7Z4EphLZywV0mAbI9MMhULREpsC6TDYdzD8B8ROoJPV_7OtoW4bbD43E6yfJ8kQJuU69SCLjZLmuvYL6ijadpLpF1RrrAK5Yh21xwmBXptgpVtssbFV12PnO0vn4gCx6U3gf_BOxtpfiibo8lqWqEC2OHgu0ODc0NQP_VDdv-x1f0gikLc94Q0TaFz3Z4Ma5l3Q3zwZUZwVoUcteCvgqEKDehwAcWpDAGldMe8UKRMkRt6DSG_EIW6UV3y6rrBL3KgN271YhwUwGMCeW9nQi8LpQCiC9AodlOg9kmkfnRRF9Vqqs61ExdS0hURHCwtJvd2i0O-XihU/p.jpeg",
      "Live",
      "A snail resting by some leaves."
    ),
    snailPicCreate(
      "8/12/22",
      "https://previews.dropbox.com/p/thumb/AB5w_cvuFrvtpadD4kPuNBvDQrhdyWsHYZ0fuHoYqLSAI2u8AoB2zX7bhF_dEWBZzY-kNzp5hPxWGdFUaday4jWsRtuLJzeH0wFwDoL96Wf48AFcGArDbEmAyL7o8gAnsoTu4y8a67cb5PLVcwlb2csIm7Yu7ZPob5F8_GmDfJteG3YBzYEWIlGdn7I-HSsv0i0vY0BF29AjqYON_ylzY5EVULIFLfstyQ-vr8MD0sniIkvMgDNA_FAyLYNnlTOnXXYSNIPSfWFdGhyYsPWUhBeRm5apT2VDj3iExPiHXk8AvCj2byjUWN9YJ3i3ridfAQNYLkklxS1z9ED_bxJtA2AM6KMg7q5qP6RLx9JJpZb09MhKoD-KISl2hynwHxBlVdk/p.jpeg",
      "2D",
      "Found on a REI gift card."
    ),
    snailPicCreate(
      "8/18/22",
      "https://previews.dropbox.com/p/thumb/AB6cuKfO035T3xc2V7B4zC9EhY7jaTNof3PHNTDxQ4sXtdnKecrXs1x3azFV7wM0LKRJ0QDVPojUXpiZ-pgHw06e6VrJW_SYKnNlD4AWiwaR6VZzXKAdB9bFrh2CHWWGs183QFdCSnlp92NOot4XRPFoMhGBF7d8DfyNMlAAH7ZbwESPyoQwQEKkbu6WsisujrukuoIpuQidypIhq1F_DSlMBvlalRtecPIO0ugbe4IB9WYb9sbgot3-Dnzj2-6z0LEl-KlsClUc2M120uGdHli9uyKJYibGrVJLfumE9R5WqkFdA6nQ81eHGx3buo8A6V_gRNZ7Z_5hUHwtW_kkW_ofX0tHCYoo_qyAYudBPcbDwiuqscAsCkjFt3mk98XPBnk/p.jpeg",
      "2D",
      "A children's book in a Colombian bookstore."
    ),
    snailPicCreate(
      "8/26/22",
      "https://previews.dropbox.com/p/thumb/AB7iJKkZ0QDWuixeTfbCeobki7Xp9A5_fS01bNZuPy_vXQaEUtXSexnt45lLbB2rWxqefWAvcE7sJFPlqJyYFZEOfDQCXhqE4fC33gnwsKlBSeba1VsSQV2HZmSEMb24sZEgi9M-iwxVhaDQMlYq-l-oLnFe5Ohfn8l8iHP69JsLG5WG_bF5Qcl7yV9mgBGou7-DVwxkdhKqtQa1p-DWDGtF-dbdisYSM0yeAKlRjzgbOgRpCShshNyExSTRXdkLNmcsfP8RUGI-NvqoK_2kMgEc9B7d_VZtOz2AC11BZu8p3MwwVZnIgernaiREu0leh8WzU97fgnhsql3QNOz6ifMKW_6em-U-AaovDfi42xndV3eIq30pdRsXStlgxibSGrU/p.jpeg",
      "2D",
      "Cover for a whimsical kid's book."
    ),
    snailPicCreate(
      "10/5/22",
      "https://previews.dropbox.com/p/thumb/AB66FoeXaPoCZmbEvM5K7U66Got5gcB9peORrikI_3bFh4qkinbSaGmowRGORmvqsCD6LOoyfxg5IEbSE_H3nXNIhlYwC1nIaygpfIg_KXNBsaOIWZxunYwt6LaXZWu23CBaVDJRJ61RFXU968WyXGfeh5PurdHGQTdaehRMhqlNPc_xuGS4NGztSCRWhuyue4VJQQRgRThR-Lx7lD7GAk3gIRMNveM8USdLjWHUNXQUdZhlHtCu2tHi_jOANKIbPZmcV50XJEYR9gX--GY8h9omqg4Zaf8hon_qJq4-vKq1F6lRHlXomM7tzsIRrOofN9eBTePWYIfrz5gGyG0uE-Bbz5P9VqgnYrAmgKQ35Bdbc2YLECIqTRp5nGquUJIP-bs/p.jpeg",
      "3D",
      "A goofy blue snail plush."
    ),
    snailPicCreate(
      "10/19/22",
      "https://previews.dropbox.com/p/thumb/AB7TfalX-zCSeLxQ_k2B3Hr9ncq9hCHdDjHGHKO9b8ITXT0qL8I9oAtZfSuR0p9D_UWBUEDM8FGaWjeiIJG4sfcUn2yZx6xizaZfuCusv_LLBhWWoguTeWib0Q5L7BcZbg6BcsKxI8nvOiIdKOlUwD3Gwjt1qMAE254FmOJ25ttmuqZj7MIjNTmSgMgrlibiqiOJ4_4UlzvYIFujrhEaqB7JtRS-Zxyasm87l3awHSLDexJz6hnG0bY7bfKGCfHiJ5z9f8ONh0iHvXsil-UQc3jiaRB3_WPUb6Clt9MbqHHerLJwRowZEFTlVrEOEOKj-HG-bmuVlvlmk8oAxTffJgLAfvX4K4oXVRFGRTE8Ex_grfpvbridVX7ou8Snc4vawsU/p.jpeg",
      "2D",
      "A beautiful mural made by children."
    ),
    snailPicCreate(
      "10/19/22",
      "https://previews.dropbox.com/p/thumb/AB6oog43WyFdNi35Fc-Uu_xdpz9xtbCWC1eI78ixgTlR18SZpgdyJ7ZdtZNQegtOLiD4gRiwHJlWu7DkX5kVtADTGOrQLgrI5TnnBhumBR_zrGyTT1cjW5_Q4ML-NFbN8lSH_hOyRLcYP5YLewU1A7FjI5ExcTomuUO8NOmi1JcA989iNqueaxpXR-kOPZ5Vx3GITTqpiR7MZSlNrxeq0giOcGSJE4eaXpEIZ-_pVhpkZLdCV1hhigwlGBcLgfDZ3agsBA6SKzZS0O722VPRH9_sraoI6xpyW8UbHYXpKD_JJ2ZqUhp1pRv8b_-fWicxppN1bz-h4gr-Awrwm6FVyWGE7OUQxyGQLFlMnQCuKL3c4ZHXiC_19vNA9yuDhvKqyhA/p.jpeg",
      "Live",
      "A snail vibin' in the dirt."
    ),
    snailPicCreate(
      "11/7/22",
      "https://previews.dropbox.com/p/thumb/AB40qoonvYyQ-4v76Gzqo174a57Hdxf9hCLMDd8PZaioxJ0aIfHP-5nCGa3t9oHtKoCX1YSl6MCXHJXY3HMtuqLo1yd-Dx68H5gmI1JeplqzX3S7zUSPXhoPkc7TBnhjOhA55wbSl0ccNkSb0Nxytpyz6w6u2709BVDYz1BoO93ZMZU8PNAS1abFP_hbUlJLBo04h4aP2S7qg662y7SntfF3evFNBx0cqMqLhPL-b7EBQ0udcuFhANIMnV65esElhSELS5_GvbeoMNXionoD6ZSpojcqYrZg17o7Rth9sRS7ygM8KxcCjA7FPKWT936UraLUEdthyb7mSialEU-PfeAiWx-Op5yatNjkrMRBnhcMMYhgsrfktU3x-LljU8aeTSw/p.jpeg",
      "2D",
      "Found in a bookstore in Buenos Aires."
    ),
    snailPicCreate(
      "11/14/22",
      "https://previews.dropbox.com/p/thumb/AB4i_sWv7u57gHLKfL_cHd9DJ-IIF7HaY1UbLHys8wQoK63yV2xdPwNJ9BfO5edUayFQC_FjqaaVYCTT5NdsVu75uGaNM6W0nzHGnGSocKlcyexR1Ise98zb3ur8CJnLUlI5thFOU6NqOV9iJxIDd9Pd0Z2_Ipd35kbDSOY04jZs_eUDILheDt_TCZP4NuaT7OErNcU1jYdFFQ0jXYRAOUXOo_VFHHv0sGiJ6Wv-QxUrQUmMYdFWtGeNf26a4dqyKlh1AkwA2gpifh8DnAeskwoYvZgZ_cHRi6C7dFdu2DFdFfCB8v-gvMx8YgZYhaiT-4CSfr5kDlOd62haxar_G7fgHvWToCDuHht_Jx3kCUKyFmfIJkNQgkBGfEhC7mYmfxY/p.jpeg",
      "2D",
      "A stylish snail advertising Lollapalooza."
    ),
    snailPicCreate(
      "12/13/22",
      "https://previews.dropbox.com/p/thumb/AB6T4q0gtNjtxgC4xCkMnP_dydgl4RElHe30BdgplGuDc4hDOTWxRyNnQSZpHWYyTHwXA4MUEP_kQTW3BnL8R4omLrYUanedco5xewFwfFu82YRBgQMGezWQS_p52fn2nUOR29Bt81QdU08_5n_QgtzToSowkgdQSXNZ2ZpqmBvMOnOcKXsAyBy2ktt2Rn2MNsZbygj1jmXCDovsNkfqJ4EYdr_t6Q64M_YFfnEAwGur1WXa1en05EPOqzlykJPb9Q-VfAJdKnVfNm8CSowK7eR7HJ-9lgCDIImxgczmiyoM_ZroYimqfrJ9CzRfD8UIf0g7gi19VfxRa4GS21tFfbnaLiunx6j1KXI76M8qfYxIvOXcEJXllpD66hT35SJ51ZQ/p.jpeg",
      "2D",
      "Half-snail, half-barrel."
    ),
    snailPicCreate(
      "12/24/22",
      "https://previews.dropbox.com/p/thumb/AB4xqA-Ln3HiNxIE4uL8PU37rRRoxnhtXRCgqL1NfMuA6ATgCuM2DI1fw4CM-mpWESHPhvF5DVHT6ULudTxc7G8sK0ffWejGSwNLiBKhTZzdYg12MOB_QS0mwPfdhXTzvut000zR8YcD0FbDCCC5hC98LlRTAuR1GH4kblVs0T4fyTem872U4wrirqGG2_0B6LZRKFWw7gxtLLBHZDvLigXywH1eBdHKiaB1b0BzwL5kJ7p8mnkhM6mCTIbCD-R5aWRWHsnitjR8jNhrFjvsJWKb9csYl-8SsiHRE5df_VvgfHsByxHFAqoSHlhmtvoka8-v4KOmP6T4u_y9EwpN-Y4hAVH8HDxzDBie4q0v3Ar1LdYsO9rfNL_l_-NWnI_X9BQ/p.jpeg",
      "2D",
      "A small snail found in Undertale."
    ),
    snailPicCreate(
      "1/25/23",
      "https://previews.dropbox.com/p/thumb/AB6jE6koPBuYUqa9wqeGHT6tI_DbqmUOJm79RAaNRTFUeZGolKAjjggdQOEOkhJMtVqrKt43LzYMYOx-ezW6iUEfxpnxNsXgR7X0Su0AKyiIwC82iyUq7n5GJsthCqjUhzi4hx6H1TWYKbpxizWsFjN9Zqkr5QdLnLtM_B2YS0K74BIpQ0MxSoo_SbLwxSQ2dD2h4kw3Bhj5NzeHhPyvow1Jlj9DuxOG_HXeKW_nV1QdL7KHmeRl-Dj5b8AYPGe_6V9oDYVXDgQG1Tj600ArKx_NF5cqG98lixo_wozCFj_Lu7UL_E33ucCeL1ZVMXMbA2Rh5fTh6MmzOCRmKNuwHypDdAfC8Nb82-yyLSXjhdI8445CIUernWiMYFPXQ_Z6hJk/p.jpeg",
      "2D",
      "A wholesome graduation card."
    ),
    snailPicCreate(
      "2/8/23",
      "https://previews.dropbox.com/p/thumb/AB4O4M-HCrOIofUtK2kyKrejTGOPtx0Sh8znC-6C3v3hGvdO5LAoTWNYNAAgxyZJqJYiAiqrwz3LeBqfLmIR9eOZW7tQle_ewItWuYx0cJ0RN0QQJE4CKcYuO6CNeox2JukOEmwudlaHUPpZ0HzpAv0MfHr9lLXvClPpTodbEeWpFTAcR5HlJsGoTY1UgP5K9HPPfhSVsIA242IefY1Z3olCF1KomQuULGbn_kKKHugUyEoF1fhfVGCZH3Sv0cRZXA2ZGQ7sPANnXK1S8ZbdmgsBgrES822J5f4cNriRWuuO5ZeiCFs67z01EpGCcW7894nrQVLO9XU_yXt1yeYZ5xkCsDH5d8mybpwVrntncG1FIH7IKoYkoQAwcgD7TEELNfY/p.jpeg",
      "2D",
      "The best sticker you could have on your water bottle."
    ),
    snailPicCreate(
      "2/9/23",
      "https://previews.dropbox.com/p/thumb/AB6ylarHWxyrCuhX0MoIlq4RZkwrFR3MWz58bORtVaPd1A9e-GkYz8PbezagLQny9vSUlGZ2e6cd6UQHkKJI7t9tMB3ZVc_y5b6OvLLVkJiauNzd0ocuBMJvmqIRMp4cibAipIbQer4SrW5p2ow3Oue3eMUWio5kOrKAO-zes4en17gkRoMnqMcrx08dKKVlZoGxtOROboWhZIuwEswlpzLKMDxPh56MadKi8DNYpnn9e4bKpKL5qVHu_QBJfguJvzfqWfnvafuLh0M32UH5IZKzMP8bHK6puX6fJTt2qM7feJAY7UqNAVdyklI7xTo5dTq_TD_gG3RHHPo4JmBCdbqKkrnG2Tk6nNLuqk4bz8DPl_VscgxaHj2AGcpLRPr9P6g/p.jpeg",
      "2D",
      "What a cutie."
    ),
    snailPicCreate(
      "3/5/23",
      "https://previews.dropbox.com/p/thumb/AB66up5LZ_Q2nfyMbkUiEnDrSAaC142UkLh_k61Rdz64Bzghey99rrPmek-kBghDGKd0qGFXJHJTZeDdmth8TU9X5z4xHK44WrRe6F6Q9xgA-i0UmFB6WEGJYxxDpUqG5FZx7H3GNTNF1BwT4vvh-CmmvgQ5ZgwT0ZjJQjNLc8qG7LQ7RvP2paGvQdaS3kLZIs4ZIRoR4CS2NQRZu27siOgE8LjBt1NhD_ZyabcAJaSi0wGTv6FNChMDincbYoJwK_tvstX5FmcP0mUZEpiye-6H9Sz3uEBjnRNmSiMz7vhz6Qa4ocUyMOGCLmwnn2c_1zA06K0n8RBejA7R5KRcd_CfyfxbhzNbqi8s5_fFuA0x4sG95kErWeM4ddGLXcSxsX0/p.jpeg",
      "2D",
      "This snail is a proud defender of LGBT rights."
    ),
    snailPicCreate(
      "3/5/23",
      "https://previews.dropbox.com/p/thumb/AB6R3HmznG93JgaSu7O6Lumhk657t7z__QXbaRi83iU3CWQOSSZag6fVxxLd9GH_jTtjaSQ7pRLOshIgcR9WEOXeJDDwMRaByzsfeW8h_zz4omWnjBLhZgPRolwpT3HLmjSR1mHeTx8neKCGJJYyVWJgd_xgmLdULHWB2eFZ4wNMnfsRHSeYj6qo6JLVRIifjegZoK8uCinpXZpnJS4IhgY0pehVwe0HOYb8oDy2__Qd6YIAYgh9DIM1jgL6DOEzEuEwQZWKQ7FBzXzXj5tUy7wMxsZTiLDScB5zhOYxytAFqvz9ZK-dLyLwU4JEkbppuBvfhWd_YuukgoSBTE3eB5wO3zGrbSm1KwjstYCDVQgjEnI0TbEzMcNtSjLWprahDtc/p.jpeg",
      "3D",
      "A snail soap dispenser!!"
    ),
    snailPicCreate(
      "3/16/23",
      "https://previews.dropbox.com/p/thumb/AB4Pe2_tvs08ovyOMa81FdXctc2dGKIasXAtBg3EwSCXT-ZWaelMOjJMS-ICtPmHACZ7p5-bW67Esz2DVhe6-9ipoOMqY8bYzb5wCuzLxr8Mtl3FDu0IM7zIArVnfyvh7RxefL7ToUV2tD3eBHUsja5gxuHvA91EPseqNVTwqmCc7BbMt4ZRBOfsJKGlOIBUoK0lmGnPwDiISrP-2_dRUYyD6KUg34pAT4GRiPC7PCI1wTdp70TIm31-NuInoYh7-ChisHPHSD_FXeLB0J63xPUFA0b9ye-cunUSP0jtSD9yheiVapCQFhar_5KpPuWgbbMynpqICvXWYSnA-_cEaFLmmRcpi9Zk1S5J-BOTpJeBOn62_N24jJPEv9PZpqtQO4A/p.jpeg",
      "2D",
      "Found on the back of a car."
    ),
    snailPicCreate(
      "3/18/23",
      "https://previews.dropbox.com/p/thumb/AB7K_YgIXTzzhBrcuB9pJxdemFC5MZChtNWHRUo4TbYCDzKE9tToB109d8_jrCicYWZkXbEY72PLznmV8vTmOqnDIjfRAgNce7813StKs09mCslaBVBSUwwZh206UxRBtmGeKm83vhpG_VONBxPyMuT8PPFRq6m1iRS8XTV8XJRSjDvwmInllcdppgxxsCe5BWq6YgWJcZhi4gXOq0I5o80BL5mTDcVgjFl8QlxpkEuiqmAP7wUxduXBgG3nVIHIKH7c3V_OQsCL8DOjVKsV5RDoOQvfc02dFOigJ02jQmpsErX8JOu-yEpSKfZor4O2egyav0xWpjQ-mD4_WQEwqljk-HetRzJpPJAHeWle2nwY8jsRMcYGMUV1s4pOXbspUgQ/p.jpeg",
      "2D",
      "A museum info display about the ground snail."
    ),
    snailPicCreate(
      "3/18/23",
      "https://previews.dropbox.com/p/thumb/AB6zlYsbpAFkRUl2oWFQMs_60Qw909EnYxuJ111eZJfFghoBFQygaWpE2EdpwMpXfQq_OMxYvnb3vjk7t6beAP6aDeGesIgXJm1grc2rmvtokC_uaIoH8vuxuhU05IFfHEXLQEVTIfRmqjIqhRPStkxwg_a3M_UySnZ8BwtGyzMbw_xioYidvOgl84LM-0yHcodGMPo5iwpMxpokk-3Bz2QugcEJdo7HdMBGmvUPJf3bEpAiceUGjeQaKJi1dve4ieEJvIovaeyi_NXwJed7ggX4ytsD9pfSC8IpKldd01vBeSV7SDRw-CZbgP7FsO_cRgcF5JCISCzxMCpr-l0hCpuWqP085uhZ36wfyVQquf95h978ZWtWeDLqvP_fYx5XREI/p.jpeg",
      "3D",
      "Good things come in threes and snails are no exception."
    ),
    snailPicCreate(
      "3/18/23",
      "https://previews.dropbox.com/p/thumb/AB6pHeVpSwehierYlhZz4Ku6r76MBhvQE5y5g--zMovKotOJoIqQJVszfuxQgU_Y7mtkIvvEippVRhySGfSsWa3cLusWoWB_8dmixTrvFZ5nkeIFWUJq2dbdcDFtWIs-7NFOtUqPWN7Bez8QAGYlMPOpWsTBPmHGo6y5agMdFDCg7a3nstxGwF6YpRIjQQqK-gXnu6A3q_Cc8O2TzR_IYN9R45d1O_noHsYXQoz497CKtBGm9NeX0Bk-kj2rVNZL0YUISoEcDRVu5JV5LTrOs4w1FhZM7RTCS32w3dPkNZWF6OtUlVE-bJ-SLZsXkN7aXci3r6hd284MG-Uug8jEyi5T6wcC11vuw5TrfSHj75G3_eaTLD8kCBV3DjUTCBtw3Co/p.jpeg",
      "2D",
      "A small medieval snail guardian."
    ),
    snailPicCreate(
      "3/19/23",
      "https://previews.dropbox.com/p/thumb/AB7ZG7BoMuGyO1TzOSoCjWcKgSZBwHxkG6TbRsUvi0_2Lzu3mddeHy-_ia04-6jEHiw-k0tS7xe1RYxLlmr-dBQibeRTZxxbUHdQhXm8p9HZitgTwGHhh_aA5yXPCzJUm6-nxhNs2rQCRUROfKGAuNAFp49AnCMfPNOiVDCXn_SqdVRn3FBM6ANO3gNHT9re5AdWxWCDkHHMj3tiKQTTVBTrY3ERnvO4TX4SAThwAtBWMb6SIabu5ysYhNpzfQtoZXQP-TmTGH-_-D0Zt-OjLuqO9-ggFtwqXIcSB-WuV1auGPzWJolvl5eRbQPM6KvjShEjWSMokw1C2NY1l414fyV34wzgzplc5ZOHEmV_Q66eDTL_ZyEYCialHQk4Z9UzgFg/p.jpeg",
      "2D",
      "A fearsome one"
    ),
    snailPicCreate(
      "4/2/23",
      "https://previews.dropbox.com/p/thumb/AB6p5OenOSp87n-sc8p9clQZIYHX3WrNY__JSww1Ix0B6r7tu5lt7B5Qh7tyh2K-xWN4sre3ATPh65vjako7cw2oPNO0IOcts3Ok_tcuYxX3VrfDeH8DEW94YvpoYjNaoORxKN5lqqFhlDknJEJiBvwEF8fKDlBrqXz2tQrIKm2lpu8fmZrAxA0Be2YVe2zIA6BWB5GvrwguFzPWdeEDzkod8iaodffcGDURGHJ4T8cEbfgwe8rtRzyV6HPM5CbXabXY0byrHD_NIrw8jiJpeTz2jxdnAkSR_K3XVd_jQEPZq9AKzsaC4nZgbhbSeVQ-jl8GS9raK929FR4jdEs5YEEcB5jPd1PYOVsH2E8ogoPVYP7x0Jnxz_scg5cPJDKTR7M/p.jpeg",
      "2D",
      "Snail socks!"
    ),
    snailPicCreate(
      "4/2/23",
      "https://previews.dropbox.com/p/thumb/AB4DLZmmr3ESr4n19pfz9hdn8lGOfbT-ZyfwDoU_mp_q9VkBk7djQde0jQd1Cjt5AvakNv601jyB3w4zdH0kTTqFyV1DJLw7rdHblyHW1fJggtiWoh_pk41zaBc_V_JRWXVd_8iv5oddAgd9UMFDd9scYBF4dZVXIlvhoGFXgQiyFmCoW2K9VfLEEgkE7-OcGC8jgHwViHK3U0v3PB_WUsJYgf90QAqj16eQftJHco5XLYsiZ937lgMxZC2PG98NVy2-rnnS3ibQ1APvkqVuD_6olJuDykxMmCYWShlISfti-4BNmxuuQAJPzTVySdA-DcetjQEDlId878Yu33y_rq0-u1FYJWe1fT1vxOlRz09veDHE37CRj1kG-pwRK8GVZ30/p.jpeg",
      "2D",
      "Wholesome forest socks. Look cozy."
    ),
    snailPicCreate(
      "4/5/23",
      "https://previews.dropbox.com/p/thumb/AB7hECyxdr2e6SxJbXvKt7JFr5jB3P818cdKjZL05UJ-Re1HrifetTZTHp0sWW1Pd2rp0Ej2ONbedQybBjjOur-y-BqCLRiysbqEhfgg6LXJaGr0YzvRMtEqu4fjuKcI7Fb5eemSogKRmPc4i2yrFgRqntHOnxw7ABQYLrwY5wDxpl5HQ1Oplth40_fik32ebrPBcD-amVxIp2lZgKeDhYPe_TINmBwomXY8yoi3D0wddmQaEfsmNQsmf56Wn583J4Au2c_KyM0_Jmq2ccv0USJotS5wGq53drKBAvOEAw2oc9Od12NbNcGeP6F1suVY92-Gk9C2wkbKz7MDhB_u-IUnKhX58KJJ2j4mZWS9xH86cKQ4NIe9JVBAAzeQLi3F1P0/p.jpeg",
      "2D",
      "The snail is good PR for a deal on a tattoo."
    ),
    snailPicCreate(
      "4/7/23",
      "https://previews.dropbox.com/p/thumb/AB4ZmqVnzcEdtD5jiV64RqZo5wiLB-HOztbG44ny82nvZskCbrYaUdWzaAvj6f87NYvNZ2WQff0ZggEwVtlBN1Cy1FHvPb9vbpiBVnFrLHp3TmR54Om-iI2lpvolFYIi0Qsc62Qx_wX0tGIbxOkjrHD-DwxzN5FEyC2ES5fjZ4xQoAP04XyVQXzTrRNJv8BXs1rTek4MrhIUS2Rb9tQ55juhC66A3qz-6e0Z9C8EcYC-UWMLIREXpbZcDljRIm_fpl6NKweledTUVeYGyzVLJhSjjjWoSxaV9HoYIDfp0O84lobjoiQe5MoFM_vo3PlGadCUzxHRsDWmfk9zCXEFqwQR1-pKKunxOAtx7yTK0S4gOOE9s1lvemcdS8qj4_rEXIY/p.jpeg",
      "2D",
      "I asked a stranger to take a pic of the back of his shirt."
    ),
    snailPicCreate(
      "4/14/23",
      "https://previews.dropbox.com/p/thumb/AB5NKXlKREwVaKJw5CSEKQAcQONJpg6HoBWf_WHQsFhHL6yHbsFgo7XksxX6uhP_fqIcCz20k1dTkf1As2kFL1eVr38LLSYCnSP3pg8GYUGxEgI91l9r1N-brxg6w1KM99LVU3f0ic8oJhVV6uv6uJWUy7CsYowhvy9dx5kI0IXlq2pCjZd9FocC8GLK0cSzrUzsMbolhMHzeJzzIX2zIwp3MpkSCz-sYpRIUERWLKYWQiSbT-UQ5x25ld2GgcuPH8oMmSV7lI5KE5ThpbxMUwEDB2h1dawmfxSZ_05VdMSwqGRowsx8aXAojyktnxr-NSr7n3fK3KHnymGlLrO6Z9I1HjAdyL6Gvthx-Dk1B49ix6I1tBDejznfhohWq2ch0ik/p.jpeg",
      "2D",
      "That snail is zoomin' along."
    ),
    snailPicCreate(
      "4/14/23",
      "https://previews.dropbox.com/p/thumb/AB6R3BnR2X3IacHEpzX8dEywXVnMCJQuyf585OqRn6CKPB6rzErGxhHece4Vz3fE-rVwfW1xZoDgXe1qTbgOMAIs-ikNbv5PVIi8aOqWZVy9pf7-0UiLc87h8TNAcZUA82c0H4Ggxpxpo0CNdcHKOzjnYglanH8jdwe0cXvPsi600M4_jiBJOjj_Jf-qlLTmyd8Ncj9l3oQkk3Qdw7wQ156cnx6swOfmTiHp2hVTlnR6tQg09IwKgpVpnNTT6dgUdcKWHOAVmhjTzBpAPCgW_Wl9OmydHywAaKBPtcn947b5KjlXWKL7iGhdyZqQB40acPYNWWQfdZDMhNeEy2kf0_pSHcgnM90mPQom1RXGYaLwmh0dKV3rOfuCCZPcW6zwtyI/p.jpeg",
      "2D",
      "Found on a cover of a board game box."
    ),
    snailPicCreate(
      "4/15/23",
      "https://previews.dropbox.com/p/thumb/AB7N_OERYECnUecQpZFAE-JmZW2d6DXiSz4Kai4ibADImaJUdU796PzMBiz-ynBkzZmslUZLmN-LwA3d6ax7dqgC-_u7EFrG6Xav790qoZjFJlfb6MWGxAlxz_8Zwq1aPNZxnNf3h_47EdGnKMb94RCPWB5t60GPgXaAqRop5fGBxxDalQxrh9MwatsHZEFLl8UFiPDrFcIG0Kvr10SD0LGosPbxcRh1aK7PeQprQ8p62s8VJEKinWFZjTWLNkDVtwy1dC1WSxgq1upnfrtQ0uYBqKEuNjVcRqYLJ81LgsWVVHNzWEMNNIy-4ElAHJk43BH8FnQaOjPDttqzBbGsmLeFGToL7MRgiKCRH3qkR1LjoWY9pn-Yv_5VCyrx8D_LdUc/p.jpeg",
      "A beautiful snail sticker. And two snails!!"
    ),
  ]);
}
