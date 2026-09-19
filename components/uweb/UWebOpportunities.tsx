"use client";

import { useMemo, useState } from "react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

import UWebOpportunityCard from "./UWebOpportunityCard";
import UWebOpportunityFilters from "./UWebOpportunityFilters";

import {
  filterUWebOpportunities,
  uwebOpportunities,
  type UWebOpportunityFilter,
} from "@/lib/uweb/opportunity-data";

export default function UWebOpportunities() {
  const [filter, setFilter] =
    useState<UWebOpportunityFilter>("all");

  const filteredOpportunities =
    useMemo(
      () =>
        filterUWebOpportunities(
          uwebOpportunities,
          filter,
        ),
      [filter],
    );

  return (
    <section className="uweb-opportunities-page">
      <Container>
        <header className="uweb-opportunities-header">
          <div>
            <span className="section-eyebrow">
              UWeb Marketplace
            </span>

            <h1>
              فرصت‌های
              <br />
              پروژه
            </h1>

            <p>
              پروژه‌هایی را پیدا کنید که با
              مهارت‌ها، پلتفرم و تجربه شما
              هماهنگ هستند و برای همکاری
              درخواست ارسال کنید.
            </p>
          </div>

          <div className="uweb-opportunities-header-action">
            <Button
              href="/uweb/projects"
              variant="secondary"
            >
              مشاهده پروژه‌ها
            </Button>
          </div>
        </header>

        <div className="uweb-opportunities-intro">
          <div>
            <strong>
              {filteredOpportunities.length}
            </strong>

            <span>
              فرصت قابل مشاهده
            </span>
          </div>

          <div>
            <strong>
              {uwebOpportunities.length}
            </strong>

            <span>
              پروژه فعال
            </span>
          </div>
        </div>

        <UWebOpportunityFilters
          value={filter}
          onChange={setFilter}
        />

        {filteredOpportunities.length > 0 ? (
          <div className="uweb-opportunities-grid">
            {filteredOpportunities.map(
              (opportunity) => (
                <UWebOpportunityCard
                  key={
                    opportunity.project.id
                  }
                  opportunity={
                    opportunity
                  }
                />
              ),
            )}
          </div>
        ) : (
          <div className="uweb-opportunities-empty">
            <div className="uweb-opportunities-empty-mark">
              U
            </div>

            <h2>
              فرصتی در این دسته پیدا نشد
            </h2>

            <p>
              فیلتر دیگری را امتحان کنید.
            </p>

            <Button
              onClick={() =>
                setFilter("all")
              }
            >
              نمایش همه فرصت‌ها
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}