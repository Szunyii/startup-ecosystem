import React from "react";

function disclaimer() {
  return (
    <div className="min-h-[89vh] flex justify-center text-white">
      <div className="mt-24 flex-col flex gap-6 w-1/2">
        <h1 className="text-3xl font-bold"> Disclaimer </h1>

        <p>
          The webpage, data collection, and platform operation are carried out
          by the <b>Hungarian Innovation Agency PLC (NIÜ)</b>.
        </p>
        <p>
          NIÜ takes all reasonable steps to ensure that the content of the
          website is accurate and up-to-date. Despite all these efforts, NIÜ
          does not assume any responsibility for the consequences of using the
          site and the data shown on the website. No legal claim or objection
          can be made in relation to the data recorded on this site. NIÜ does
          <b> not assume any responsibility</b> for the content available on
          links leading from the sites.
        </p>
      </div>
    </div>
  );
}

export default disclaimer;
