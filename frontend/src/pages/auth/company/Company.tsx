import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Cms from "../../../components/cms/Cms";
import DescriptionList from "../../../components/information/DescriptionList";
import Loader from "../../../components/loaders/Loader";
import useSettings from "../../../hooks/useSettings";
import { fetchCompanies } from "../../../scripts/fetch";
import { TCompany } from "@/types/Company";

const Company = () => {
    return (
        <DescriptionList

        />
    )
}

export default Company;