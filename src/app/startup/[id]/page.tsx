import React from "react";

function page({ params: { id } }: { params: { id: string } }) {
  return <div>{id}</div>;
}

export default page;
